from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from uuid import UUID
from datetime import datetime

from app.models.receipt import Receipt, ReceiptStatus

class ReceiptRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, user_id: UUID, image_url: str) -> Receipt:
        receipt = Receipt(
            user_id=user_id,
            image_url=image_url,
            status=ReceiptStatus.pending
        )
        self.db.add(receipt)
        await self.db.commit()
        await self.db.refresh(receipt)
        return receipt

    async def get_by_id(self, receipt_id: UUID) -> Optional[Receipt]:
        result = await self.db.execute(
            select(Receipt).where(Receipt.id == receipt_id)
        )
        return result.scalar_one_or_none()

    async def update_status(
        self,
        receipt: Receipt,
        status: ReceiptStatus,
        raw_ocr_text: Optional[str] = None
    ) -> Receipt:
        receipt.status = status
        if raw_ocr_text:
            receipt.raw_ocr_text = raw_ocr_text
        if status == ReceiptStatus.done:
            receipt.processed_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(receipt)
        return receipt