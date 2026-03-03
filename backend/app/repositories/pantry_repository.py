from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from uuid import UUID

from app.models.pantry import PantryItem, ItemCategory

class PantryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(
        self,
        user_id: UUID,
        name: str,
        quantity: float,
        unit: Optional[str],
        category: str,
        receipt_id: Optional[UUID] = None,
        added_via: str = "manual"
    ) -> PantryItem:
        # safely convert category string to enum, fallback to other
        try:
            item_category = ItemCategory(category.lower())
        except ValueError:
            item_category = ItemCategory.other

        item = PantryItem(
            user_id=user_id,
            receipt_id=receipt_id,
            name=name,
            quantity=quantity,
            unit=unit,
            category=item_category,
            added_via=added_via
        )
        self.db.add(item)
        await self.db.commit()
        await self.db.refresh(item)
        return item

    async def bulk_create(
        self,
        user_id: UUID,
        items: list,
        receipt_id: Optional[UUID] = None
    ) -> List[PantryItem]:
        created_items = []
        for item_data in items:
            name = item_data.get("name")
            if not name:
                 continue
            
            try:
                category_str = item_data.get("category", "other")
                if not category_str:
                    item_category = ItemCategory.other
                else:
                    item_category = ItemCategory(category_str.lower())
            except ValueError:
                item_category = ItemCategory.other

            pantry_item = PantryItem(
                user_id=user_id,
                receipt_id=receipt_id,
                name=name,
                quantity=item_data.get("quantity", 1.0),
                unit=item_data.get("unit"),
                category=item_category,
                added_via="receipt"
            )
            self.db.add(pantry_item)
            created_items.append(pantry_item)
            
        await self.db.commit()
        
        for item in created_items:
            await self.db.refresh(item)
            
        return created_items

    async def get_all_by_user(self, user_id: UUID) -> List[PantryItem]:
        result = await self.db.execute(
            select(PantryItem)
            .where(PantryItem.user_id == user_id)
            .order_by(PantryItem.expiry_date.asc().nullslast())
        )
        return result.scalars().all()