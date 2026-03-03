from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.repositories.receipt_repository import ReceiptRepository
from app.repositories.pantry_repository import PantryRepository
from app.services.ocr_service import OCRService
from app.services.ai_service import AIService
from app.services.receipt_service import ReceiptService
from app.schemas.receipt import ReceiptProcessedResponse

router = APIRouter(prefix="/api/v1/receipts", tags=["Receipts"]) 
ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
MAX_SIZE_MB = 10

def get_receipt_service(db: AsyncSession = Depends(get_db)) -> ReceiptService:
    return ReceiptService(
        receipt_repo=ReceiptRepository(db),
        pantry_repo=PantryRepository(db),
        ocr_service=OCRService(),
        ai_service=AIService()
    )
    
@router.post("/upload", response_model=ReceiptProcessedResponse)
async def upload_receipt(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    service: ReceiptService = Depends(get_receipt_service)
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {ALLOWED_TYPES}"
        )
    image_bytes = await file.read()
    size_mb = len(image_bytes) / (1024 * 1024)
    if size_mb > MAX_SIZE_MB:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Max size: {MAX_SIZE_MB}MB"
        )
    return await service.upload_and_process(
        user_id=current_user.id,
        image_bytes=image_bytes,
        filename=file.filename
    )