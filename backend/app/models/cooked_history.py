from sqlalchemy import Column, String, Boolean, Integer, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.core.database import Base
from app.models.recipe import MealType

class CookedHistory(Base):
    __tablename__ = "cooked_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    recipe_id = Column(UUID(as_uuid=True), ForeignKey("recipes.id"), nullable=True)
    recipe_title = Column(String, nullable=False)
    cuisine_type = Column(String, nullable=True)
    meal_type = Column(Enum(MealType), nullable=True)
    rating = Column(Integer, nullable=True)
    was_skipped = Column(Boolean, default=False)
    cooked_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="cooked_history")
    recipe = relationship("Recipe", back_populates="cooked_history")