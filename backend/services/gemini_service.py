import httpx
from config import GEMINI_API_KEY, GEMINI_API_URL
from utils.text_cleaner import clean_text

async def get_gemini_response(user_input: str) -> str:
    headers = {"Content-Type": "application/json"}
    params = {"key": GEMINI_API_KEY}
    payload = {
        "contents": [
            {"parts": [{"text": user_input}]}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(GEMINI_API_URL, headers=headers, params=params, json=payload)
        response_data = response.json()

    try:
        raw_text = response_data["candidates"][0]["content"]["parts"][0]["text"]
        return clean_text(raw_text)
    except Exception:
        return "Sorry, I couldn't understand that."
