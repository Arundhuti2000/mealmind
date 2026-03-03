from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ENVIRONMENT: str = "development"
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_JWT_SECRET: str
    
    GOOGLE_APPLICATION_CREDENTIALS: str
    GEMINI_API_KEY: str

    class Config:
        env_file = ".env"
        extra = "ignore" 

settings = Settings()