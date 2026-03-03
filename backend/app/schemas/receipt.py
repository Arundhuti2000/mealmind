from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional, List
from app.models.receipt import ReceiptStatus

class ReceiptUploadResponse(BaseModel):
    id: UUID
    status: ReceiptStatus
    message: str

class ParsedItem(BaseModel):
    name: str
    quantity: float
    unit: Optional[str] = None
    category: Optional[str] = "other"

class ReceiptProcessedResponse(BaseModel):
    receipt_id: UUID
    items_added: int
    items: List[ParsedItem] = []
    items: List[ParsedItem]

class ReceiptResponse(BaseModel):
    id: UUID
    status: ReceiptStatus
    created_at: datetime
    processed_at: Optional[datetime] = None

    class Config:
        from_attributes = True