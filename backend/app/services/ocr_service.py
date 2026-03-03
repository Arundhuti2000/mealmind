import os
from google.cloud import vision

from app.core.config import settings

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = settings.GOOGLE_APPLICATION_CREDENTIALS

class OCRService:
    def __init__(self):
        self.client = vision.ImageAnnotatorAsyncClient()

    async def extract_text_from_image(self, image_bytes: bytes) -> str:
        image = vision.Image(content=image_bytes)

        response = await self.client.text_detection(image=image)

        if response.error.message:
            raise Exception(f"Vision API error: {response.error.message}")

        full_text = response.full_text_annotation.text

        if not full_text:
            raise Exception("No text found in image")

        return full_text