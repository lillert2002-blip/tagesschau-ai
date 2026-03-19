import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const runAnalysis = async () => {
    if (!apiKey) return alert("Bitte erst den API-Key eingeben!");
    setLoading(true);
    setData('KI denkt nach... bitte ca. 60 Sekunden warten...');
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "model: "gemini-1.5-flash" });
      const prompt = "Analysiere das Tagesschau-Video vom 18.03.2026 von der Playlist https://www.youtube.com/playlist?list=PL4A2F331EE86DCC22. Erstelle ein wörtliches Transkript auf Deutsch, beschreibe das Studio visuell und fasse die Themen zusammen.";
      const result = await model.generateContent(prompt);
      setData(result.response.text());
    } catch (err) {
      setData("Fehler: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{fontFamily: 'sans-serif', maxWidth: '700px', margin: 'auto', padding: '50px', lineHeight: '1.5'}}>
      <h1 style={{color: '#003366'}}>Tagesschau AI Monitor</h1>
      <div style={{background: '#f0f0f0', padding: '20px', borderRadius: '10px'}}>
        <label>Google API-Key:</label>
        <input 
          type="password" 
          value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)} 
          placeholder="AIzaSy..." 
          style={{width: '100%', padding: '10px', marginTop: '10px', boxSizing: 'border-box'}} 
        />
        <button 
          onClick={runAnalysis} 
          disabled={loading} 
          style={{marginTop: '20px', width: '100%', padding: '15px', background: '#003366', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}
        >
          {loading ? "KI arbeitet..." : "Sendung von gestern analysieren"}
        </button>
      </div>
      <div style={{marginTop: '30px', whiteSpace: 'pre-wrap', background: 'white', border: '1px solid #ccc', padding: '20px', borderRadius: '5px'}}>
        {data || "Hier erscheint das Ergebnis..."}
      </div>
    </div>
  );
}
