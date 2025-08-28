import React, { useState } from "react";
import axios from "axios";

function ProgressPage() {
  const [activity, setActivity] = useState("");
  const [progress, setProgress] = useState([]);

  const saveProgress = async () => {
    try {
      const res = await axios.post("http://localhost:8000/progress", {
        user_id: "user123", // later dynamic from login
        activity,
      });
      setProgress(res.data.progress);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Track Progress</h2>
      <input
        type="text"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="Enter activity..."
      />
      <button onClick={saveProgress} style={{ marginLeft: "10px" }}>
        Save
      </button>

      {progress.length > 0 && (
        <ul style={{ marginTop: "20px" }}>
          {progress.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProgressPage;
