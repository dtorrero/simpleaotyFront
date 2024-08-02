import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+
import App from './App'; // Import your main App component
import './index.css'; // Optional: your CSS file

// Create a root for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root div in index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
