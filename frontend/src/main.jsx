import React from 'react';
import { createRoot } from 'react-dom/client';

function App(){
  return (
    <div style={{ padding: 24 }}>
      <h1>POS Frontend (Vite)</h1>
      <p>API: {import.meta.env.VITE_API_BASE_URL}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
