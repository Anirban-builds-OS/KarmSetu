import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';

const rootElement = document.getElementById('root');

if (!rootElement) {
  // Show a user-visible error instead of a silent crash
  document.body.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0f172a;color:#e2e8f0;font-family:Inter,sans-serif;text-align:center;">' +
    '<div><h1 style="font-size:1.5rem;font-weight:700;">KarmSetu failed to initialise</h1>' +
    '<p style="color:#94a3b8;margin-top:0.5rem;">The application root element is missing from the page.</p></div></div>';
  throw new Error('[KarmSetu] #root element not found in DOM.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
