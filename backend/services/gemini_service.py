# services/gemini_service.py
import httpx
from config import GEMINI_API_KEY, GEMINI_API_URL
from utils.text_cleaner import clean_text

async def get_gemini_response(user_input: str, mode: str = "chat") -> str:
    headers = {"Content-Type": "application/json"}
    params = {"key": GEMINI_API_KEY}

    # Prompt modifier based on mode
    if mode == "vocab":
        prompt = f"Give me 5 new vocabulary words with meanings and example sentences related to: {user_input}"
    elif mode == "grammar":
        prompt = f"Correct the grammar in this sentence: '{user_input}' and explain the correction simply."
    elif mode == "pronunciation":
        prompt = f"Provide a pronunciation guide for this word/phrase: '{user_input}'. Use phonetics + tips."
    elif mode == "conversation":
        prompt = f"Let's roleplay a short conversation. You are a friendly language buddy. Start the chat based on: {user_input}"
    else:  # default chat
        prompt = user_input

    payload = {
        "model": "gemini-1.5-flash",
        "contents": [{"parts": [{"text": prompt}]}],
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:  # ⬅ 30s timeout
            response = await client.post(GEMINI_API_URL, headers=headers, params=params, json=payload)
            response_data = response.json()
            print("DEBUG GEMINI RESPONSE:", response_data)

        raw_text = response_data["candidates"][0]["content"]["parts"][0]["text"]
        return clean_text(raw_text)

    except httpx.ReadTimeout:
        return "Sorry, the request timed out. Please try again."
    except Exception as e:
        # Catch any other error
        return f"Sorry, couldn’t understand that. (Error: {response_data.get('error', str(e)) if 'response_data' in locals() else str(e)})"
