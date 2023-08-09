import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> Burada yorum satırına aldığım şey, sebebini bilmediğim bir şekilde fonksiyonların iki kere çalışmasına sebep oluyordu.
    <App />
  // </React.StrictMode>
);
