from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from supabase import create_client
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas.register import RegisterRequest
from app.schemas.login import LoginRequest

from app.core.config import settings
from app.core.database import get_db
from app.repositories.user_repository import UserRepository
from app.repositories.user_repository import UserRepository

router = APIRouter(prefix="/auth", tags=["Auth"])
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)

async def get_user_repository(session: AsyncSession = Depends(get_db)) -> UserRepository:
    return UserRepository(session)

@router.post("/register")
async def register(body: RegisterRequest, user_repo: UserRepository = Depends(get_user_repository)):
    # Check if user already exists
    existing_user = await user_repo.get_by_email(body.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already registered")

    try:
        response= supabase.auth.sign_up({
            "email": body.email,
            "password": body.password
        })
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    if not response.user:
        raise HTTPException(status_code=400, detail="Registration failed")
    
    supabase_id= response.user.id
    
    # Create user in local DB using Repository
    user_data = {
        "email": body.email,
        "supabase_id": supabase_id,
        "dietary_preferences": [],
        "cuisine_preferences": []
    }
    
    await user_repo.create(user_data)
    
    return {"message": "User registered successfully"}
    
    