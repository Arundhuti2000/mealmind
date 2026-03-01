from sqlalchemy import Column, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base

class AlertType(str, enum.Enum):
    warning = "warning"    # 3-7 days
    critical = "critical"  # less than 3 days

class ExpiryAlert(Base):
    __tablename__ = "expiry_alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    pantry_item_id = Column(UUID(as_uuid=True), ForeignKey("pantry_items.id"), nullable=False)
    alert_type = Column(Enum(AlertType), nullable=False)
    sent_at = Column(DateTime(timezone=True), server_default=func.now())
    is_dismissed = Column(Boolean, default=False)
    dismissed_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="expiry_alerts")
    pantry_item = relationship("PantryItem", back_populates="expiry_alerts")