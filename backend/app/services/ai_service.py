import json
import google.generativeai as genai

from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

class AIService:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    async def parse_receipt_items(self, ocr_text: str) -> list:
        prompt = f"""
        You are a grocery receipt parser.
        
        Extract all grocery items from the following receipt text and return ONLY a JSON array.
        No explanation, no markdown, no code blocks — just the raw JSON array.

        Each item in the array must have exactly these fields:
        - name (string): the item name, cleaned up and readable
        - quantity (float): how many units, default 1.0 if not clear
        - unit (string or null): e.g. "kg", "liters", "pieces", null if not applicable
        - category (string): one of: dairy, vegetables, fruits, meat, seafood, grains, spices, beverages, snacks, frozen, other

        Receipt text:
        {ocr_text}

        Return only the JSON array, nothing else.
        """

        response = await self.model.generate_content_async(prompt)
        raw = response.text.strip()
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        raw = raw.strip()

        try:
            items = json.loads(raw)
            if not isinstance(items, list):
                raise ValueError("Response is not a list")
            return items
        except (json.JSONDecodeError, ValueError) as e:
            raise Exception(f"Failed to parse Gemini response: {e}\nRaw: {raw}")