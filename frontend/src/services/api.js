// src/services/api.js
import axios from "axios";

// backend URL (adjust if needed)
const API_URL = "http://localhost:8000/chat";

export async function sendMessage(message) {
  try {
    const response = await axios.post(API_URL, { message });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    return { reply: "Sorry, something went wrong." };
  }
}
