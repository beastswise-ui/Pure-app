import React from 'react';
import { createRoot } from 'react-dom/client';

// 1. De inhoud van je app
function App() {
return (
<div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
<h1 style={{ fontSize: '3rem' }}>PURE IS LIVE! 🚀</h1>
</div>
);
}

// 2. De code die de app echt op het scherm zet
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);