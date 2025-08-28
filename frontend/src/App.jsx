// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import AboutPage from "./pages/AboutPage";
import TranslatePage from "./pages/TranslatePage";
import DailyWordPage from "./pages/DailyWordPage";
import ProgressPage from "./pages/ProgressPage";

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/daily-word" element={<DailyWordPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
