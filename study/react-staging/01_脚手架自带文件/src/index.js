import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 严格模式 检查代码
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 用于测量性能
reportWebVitals();
