from fastapi import FastAPI
from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.receipts import router as receipts_router

app = FastAPI(
    title="MealMind API",
    version="0.1.0"
)

app.include_router(auth_router)
app.include_router(receipts_router)

@app.get("/")
def root():
    return {"message": "Welcome to MealMind API"}

@app.get("/health")
def health_check():
    return {"status": "MealMind is alive 🧠"}