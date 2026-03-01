from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    supabase_id = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    dietary_preferences = Column(JSONB, default=list)
    cuisine_preferences = Column(JSONB, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    pantry_items = relationship("PantryItem", back_populates="user")
    receipts = relationship("Receipt", back_populates="user")
    recipes = relationship("Recipe", back_populates="user")
    cooked_history = relationship("CookedHistory", back_populates="user")
    shopping_lists = relationship("ShoppingList", back_populates="user")
    expiry_alerts = relationship("ExpiryAlert", back_populates="user")