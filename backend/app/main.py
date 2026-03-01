from fastapi import FastAPI

app = FastAPI(
    title="MealMind API",
    version="0.1.0"
)

@app.get("/health")
def health_check():
    return {"status": "MealMind is alive 🧠"}