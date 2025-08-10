import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';      // your app styles
import './index.css';    // global styles
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
