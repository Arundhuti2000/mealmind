import os
import anyio
from uuid import UUID
from fastapi import HTTPException
from app.repositories.receipt_repository import ReceiptRepository
from app.repositories.pantry_repository import PantryRepository
from app.services.ocr_service import OCRService
from app.services.ai_service import AIService
from app.models.receipt import ReceiptStatus
from app.schemas.receipt import ReceiptUploadResponse, ReceiptProcessedResponse, ParsedItem

class ReceiptService:
    def __init__(
        self,
        receipt_repo: ReceiptRepository,
        pantry_repo: PantryRepository,
        ocr_service: OCRService,
        ai_service: AIService
    ):
        self.receipt_repo = receipt_repo
        self.pantry_repo = pantry_repo
        self.ocr_service = ocr_service
        self.ai_service = ai_service

    async def upload_and_process(
        self,
        user_id: UUID,
        image_bytes: bytes,
        filename: str
    ) -> ReceiptProcessedResponse:
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        image_path = f"{upload_dir}/{user_id}_{filename}"
        
        async with await anyio.open_file(image_path, "wb") as f:
            await f.write(image_bytes)

        # 2. Create receipt record in DB
        receipt = await self.receipt_repo.create(
            user_id=user_id,
            image_url=image_path
        )

        #Update status to processing
        await self.receipt_repo.update_status(
            receipt, ReceiptStatus.processing
        )

        try:
            #Extract text via Google Vision OCR
            ocr_text = await self.ocr_service.extract_text_from_image(image_bytes)

            #Parse items via Gemini AI
            parsed_items = await self.ai_service.parse_receipt_items(ocr_text)

            #Save items to pantry
            created_items = await self.pantry_repo.bulk_create(
                user_id=user_id,
                items=parsed_items,
                receipt_id=receipt.id
            )

            #Mark receipt as done
            await self.receipt_repo.update_status(
                receipt,
                ReceiptStatus.done,
                raw_ocr_text=ocr_text
            )

            return ReceiptProcessedResponse(
                receipt_id=receipt.id,
                items_added=len(created_items),
                items=[
                    ParsedItem(
                        name=item.name,
                        quantity=item.quantity,
                        unit=item.unit,
                        category=item.category.value
                    )
                    for item in created_items
                ]
            )

        except Exception as e:
            # Mark receipt as failed
            await self.receipt_repo.update_status(
                receipt, ReceiptStatus.failed
            )
            raise HTTPException(
                status_code=500,
                detail=f"Receipt processing failed: {str(e)}"
            )