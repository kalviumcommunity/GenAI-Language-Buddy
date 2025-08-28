import React, { useState } from "react";
import axios from "axios";

function DailyWordPage() {
  const [word, setWord] = useState("");

  const fetchWord = async () => {
    try {
      const res = await axios.get("http://localhost:8000/daily-word");
      setWord(res.data.daily_word);
    } catch (err) {
      setWord("Error: Could not fetch daily word.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Daily Word</h2>
      <button onClick={fetchWord}>Get Today's Word</button>
      {word && (
        <p style={{ marginTop: "20px" }}>
          <strong>Word of the Day:</strong> {word}
        </p>
      )}
    </div>
  );
}

export default DailyWordPage;
