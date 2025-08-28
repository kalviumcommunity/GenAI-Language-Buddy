// src/pages/ChatPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatPage.css";

function ChatPage() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("English"); // default language

  // Save messages in localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input,
        language: language,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "Buddy", text: res.data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "Buddy", text: "⚠️ Error connecting to server" },
      ]);
    }

    setInput("");
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="chat-container">
      <h2>NovaMind</h2>

      {/* Language Selector */}
      <div className="chat-controls">
        <label>
          Select Language:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
          </select>
        </label>
        <button className="clear-btn" onClick={handleClear}>Clear Chat</button>
      </div>

      {/* Chat Window */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender === "You" ? "user" : "bot"}`}
          >
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
    
  );
}

export default ChatPage;
