from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings

class DatabaseSessionManager:
    """
    Singleton class to manage database connection and session creation.
    """
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseSessionManager, cls).__new__(cls)
            cls._instance._engine = create_async_engine(
                settings.DATABASE_URL,
                echo=True,
                future=True
            )
            cls._instance._session_factory = async_sessionmaker(
                bind=cls._instance._engine,
                class_=AsyncSession,
                expire_on_commit=False,
                autoflush=False,
                autocommit=False,
            )
        return cls._instance

    @property
    def engine(self):
        return self._engine

    @property
    def session_factory(self):
        return self._session_factory

# Global instance
db_manager = DatabaseSessionManager()

Base = declarative_base()

async def get_db():
    async with db_manager.session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise