from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.gemini_service import get_gemini_response

app = FastAPI(
    title="NovaMind",
    description="Chatbot powered by Gemini API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELS ---
class ChatRequest(BaseModel):
    message: str

class TranslateRequest(BaseModel):
    text: str
    target_lang: str

class VoiceChatRequest(BaseModel):
    text: str

class ProgressRequest(BaseModel):
    user_id: str
    activity: str


# --- ROUTES ---

@app.post("/chat")
async def chat(request: ChatRequest):
    response_text = await get_gemini_response(request.message)
    return {"reply": response_text}


@app.post("/translate")
async def translate(request: TranslateRequest):
    prompt = f"Translate this to {request.target_lang}: {request.text}"
    response_text = await get_gemini_response(prompt)
    return {"translation": response_text}


@app.get("/daily-word")
async def daily_word():
    prompt = "Give me one useful word or phrase for language learners. Format: Word - Translation - Example sentence."
    response_text = await get_gemini_response(prompt)
    return {"daily_word": response_text}


@app.post("/voice-chat")
async def voice_chat(request: VoiceChatRequest):
    response_text = await get_gemini_response(request.text)
    return {"reply": response_text}


# Basic in-memory progress tracker
user_progress = {}

@app.post("/progress")
async def track_progress(request: ProgressRequest):
    user_progress.setdefault(request.user_id, []).append(request.activity)
    return {"message": "Progress saved", "progress": user_progress[request.user_id]}
