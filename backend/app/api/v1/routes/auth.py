from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from supabase import create_client
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ....schemas.register import RegisterRequest
from ....schemas.login import LoginRequest

from app.core.config import settings
from app.core.database import get_db
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)

@router.post("/register")
async def register(body: RegisterRequest, db: AsyncSession= Depends(get_db)):
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
    
    