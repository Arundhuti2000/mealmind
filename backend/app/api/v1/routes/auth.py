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
from app.api.deps import get_user_repository, get_current_user
from app.models.user import User
router = APIRouter(prefix="/api/v1/auth", tags=["Auth"])
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)


@router.get("/me")
async def get_me(user: User = Depends(get_current_user)):
    return {
        "id": str(user.id),
        "email": user.email,
        "supabase_id": user.supabase_id
    }


@router.post("/register")
async def register(body: RegisterRequest, user_repo: UserRepository = Depends(get_user_repository)):
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
    
    user_data = {
        "email": body.email,
        "supabase_id": supabase_id,
        "dietary_preferences": [],
        "cuisine_preferences": []
    }
    
    await user_repo.create(user_data)
    
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(
    body: LoginRequest, 
    user_repo: UserRepository = Depends(get_user_repository)
):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": body.email,
            "password": body.password
        })
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    if not response.user or not response.session:
        raise HTTPException(status_code=400, detail="Login failed")

    # Get local user data
    user = await user_repo.get_by_supabase_id(response.user.id)
    
    if not user:
        raise HTTPException(status_code=404, detail="User profile found in Supabase but missing locally")

    return {
        "access_token": response.session.access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "email": user.email,
            "supabase_id": user.supabase_id
        }
    }
    
    