import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Simple render without StrictMode to isolate issues
const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

// If React fails to render, show a basic error message
window.addEventListener('error', (event) => {
  if (document.body.children.length === 0 || 
      (document.body.children.length === 1 && document.body.children[0].id === 'root' && 
       document.body.children[0].children.length === 0)) {
    
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif;">
        <h1>React failed to render</h1>
        <p>Check your browser console for errors.</p>
        <div style="background: #f8f8f8; padding: 10px; border: 1px solid #ddd; margin-top: 10px;">
          <strong>Error:</strong> ${event.error?.message || event.message}
        </div>
      </div>
    `;
  }
});

// Display initial load message
console.log("Application starting...");