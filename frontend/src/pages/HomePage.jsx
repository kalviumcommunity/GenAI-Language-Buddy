import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">
          Welcome to <span>NovaMind</span>
        </h1>
       <p className="home-subtitle">
  Your AI-powered chatbot for general purposes—ask questions, get explanations, 
  brainstorm ideas, or just chat in a fun, interactive, and professional way.
</p>

        <Link to="/chat" className="home-button">
          Start Chatting
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
