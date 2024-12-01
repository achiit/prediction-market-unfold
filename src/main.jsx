import 'buffer'; // Buffer polyfill
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3Provider>
      <Router>
        <App />
      </Router>
    </Web3Provider>
  </React.StrictMode>
);
