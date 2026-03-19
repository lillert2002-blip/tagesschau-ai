import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const runAI = async () => {
    if (!apiKey) return alert("Bitte erst deinen Google API-Key eingeben!");
    setLoading(true);
    setData('');
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" });
      const prompt = "Analysiere das Tagesschau-Video vom 18.03.2026 von der Playlist https://www.youtube.com/playlist?list=PL4A2F331EE86DCC22. Erstelle ein wörtliches Transkript auf Deutsch, beschreibe das Studio visuell und fasse die Themen zusammen.";
      const result = await model.generateContent(prompt);
      setData(result.response.text());
    } catch (err) {
      setData("Fehler: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto', padding: '40px'}}>
      <h1 style={{color: '#003366', borderBottom: '2px solid #003366'}}>Tagesschau AI-Monitor</h1>
      <div style={{background: '#f4f4f4', padding: '20px', borderRadius: '10px', marginTop: '20px'}}>
        <label><b>Google API-Key:</b></label>
        <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="AIzaSy..." style={{width: '100%', padding: '10px', marginTop: '10px'}} />
        <button onClick={runAI} disabled={loading} style={{marginTop: '20px', width: '100%', padding: '15px', background: '#003366', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'}}>
          {loading ? "KI analysiert die Sendung (ca. 60 Sek)..." : "Sendung von gestern analysieren"}
        </button>
      </div>
      {data && (
        <div style={{marginTop: '30px', background: 'white', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', whiteSpace: 'pre-wrap'}}>
          <h2>Ergebnis für den 18.03.2026:</h2>
          {data}
        </div>
      )}
    </div>
  );
}
