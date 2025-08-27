from fastapi import FastAPI
from pydantic import BaseModel
from services.gemini_service import get_gemini_response

app = FastAPI(title="GenAI Language Buddy", description="Chatbot powered by Gemini API")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    response_text = await get_gemini_response(request.message)
    return {"reply": response_text}
