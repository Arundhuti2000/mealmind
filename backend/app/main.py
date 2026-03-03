from fastapi import FastAPI
from app.api.v1.routes.auth import router as auth_router

app = FastAPI(
    title="MealMind API",
    version="0.1.0"
)

app.include_router(auth_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Welcome to MealMind API"}

@app.get("/health")
def health_check():
    return {"status": "MealMind is alive 🧠"}