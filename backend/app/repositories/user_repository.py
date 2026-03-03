from typing import Optional
from sqlalchemy import select
from .base import BaseRepository
from app.models.user import User

class UserRepository(BaseRepository[User]):
    """
    User-specific Repository.
    """
    def __init__(self, session):
        super().__init__(User, session)

    async def get_by_email(self, email: str) -> Optional[User]:
        stmt = select(User).where(User.email == email)
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_by_supabase_id(self, supabase_id: str) -> Optional[User]:
        stmt = select(User).where(User.supabase_id == supabase_id)
        result = await self.session.execute(stmt)
        return result.scalars().first()
