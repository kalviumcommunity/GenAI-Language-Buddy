import React, { useState } from "react";
import axios from "axios";

function TranslatePage() {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [translation, setTranslation] = useState("");

  const handleTranslate = async () => {
    try {
      const res = await axios.post("http://localhost:8000/translate", {
        text,
        target_lang: targetLang,
      });
      setTranslation(res.data.translation);
    } catch (err) {
      setTranslation("Error: Could not translate.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Translate</h2>
      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <br />
      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        <option>Spanish</option>
        <option>French</option>
        <option>German</option>
        <option>Japanese</option>
      </select>
      <button onClick={handleTranslate} style={{ marginLeft: "10px" }}>
        Translate
      </button>
      {translation && (
        <p style={{ marginTop: "20px" }}>
          <strong>Translation:</strong> {translation}
        </p>
      )}
    </div>
  );
}

export default TranslatePage;
