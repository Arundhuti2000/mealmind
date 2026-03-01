from sqlalchemy import Column, String, Text, Boolean, Integer, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base

class MealType(str, enum.Enum):
    breakfast = "breakfast"
    lunch = "lunch"
    dinner = "dinner"
    snack = "snack"

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    cuisine_type = Column(String, nullable=True)
    meal_type = Column(Enum(MealType), nullable=False)
    prep_time_minutes = Column(Integer, nullable=True)
    instructions = Column(Text, nullable=False)
    ingredients_needed = Column(JSONB, nullable=False)
    is_ai_generated = Column(Boolean, default=True)
    is_saved = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="recipes")
    cooked_history = relationship("CookedHistory", back_populates="recipe")