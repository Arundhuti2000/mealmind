from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base

class ItemCategory(str, enum.Enum):
    dairy = "dairy"
    vegetables = "vegetables"
    fruits = "fruits"
    meat = "meat"
    seafood = "seafood"
    grains = "grains"
    spices = "spices"
    beverages = "beverages"
    snacks = "snacks"
    frozen = "frozen"
    other = "other"

class PantryItem(Base):
    __tablename__ = "pantry_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    receipt_id = Column(UUID(as_uuid=True), ForeignKey("receipts.id"), nullable=True)
    name = Column(String, nullable=False)
    quantity = Column(Float, default=1.0)
    unit = Column(String, nullable=True)
    category = Column(Enum(ItemCategory), default=ItemCategory.other)
    expiry_date = Column(DateTime(timezone=True), nullable=True)
    added_via = Column(String, default="manual")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="pantry_items")
    receipt = relationship("Receipt", back_populates="pantry_items")
    expiry_alerts = relationship("ExpiryAlert", back_populates="pantry_item")