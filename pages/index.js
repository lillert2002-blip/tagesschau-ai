import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const runAnalysis = async () => {
    // .trim() entfernt versehentliche Leerzeichen am Anfang/Ende
    const cleanKey = apiKey.trim();
    if (!cleanKey) return alert("Bitte erst den API-Key eingeben!");
    
    setLoading(true);
    setData('KI startet Analyse... bitte ca. 60 Sek. warten...');
    
    try {
      const genAI = new GoogleGenerativeAI(cleanKey);
      // Wir nutzen das stabilste Modell 1.5 Flash
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = "Analysiere das Tagesschau-Video vom 18.03.2026 von der Playlist https://www.youtube.com/playlist?list=PL4A2F331EE86DCC22. Erstelle ein wörtliches Transkript auf Deutsch, beschreibe das Studio visuell und fasse die Themen zusammen.";
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setData(response.text());
    } catch (err) {
      setData("Fehler-Details: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{fontFamily: 'sans-serif', maxWidth: '700px', margin: 'auto', padding: '50px', backgroundColor: '#f4f7f6', minHeight: '100vh'}}>
      <h1 style={{color: '#003366', textAlign: 'center'}}>Tagesschau AI Monitor</h1>
      <div style={{background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
        <label style={{display: 'block', marginBottom: '10px', fontWeight: 'bold'}}>Dein Google API-Key:</label>
        <input 
          type="password" 
          value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)} 
          placeholder="Hier AIzaSy... einfügen" 
          style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box'}} 
        />
        <button 
          onClick={runAnalysis} 
          disabled={loading} 
          style={{marginTop: '20px', width: '100%', padding: '15px', background: '#003366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px'}}
        >
          {loading ? "KI arbeitet..." : "Analyse von gestern starten"}
        </button>
      </div>
      <div style={{marginTop: '30px', whiteSpace: 'pre-wrap', background: 'white', border: '1px solid #eee', padding: '25px', borderRadius: '10px', color: '#333', lineHeight: '1.6'}}>
        {data || "Hier erscheint das wörtliche Transkript..."}
      </div>
    </div>
  );
}
