// import 'buffer'; // Buffer polyfill
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Web3Provider } from './context/Web3Context';
// import App from './App';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Web3Provider>
//       <Router>
//         <App />
//       </Router>
//     </Web3Provider>
//   </React.StrictMode>
// );

import 'buffer'; // Buffer polyfill
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';

import App from './App';
import './index.css';

const GOOGLE_CLIENT_ID = "145681347777-f2362a3ltnjrhp2stqd39rfoskgja1co.apps.googleusercontent.com"; // Replace with your Google Client ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Web3Provider>
        <Router>
          <App />
        </Router>
      </Web3Provider>
      </GoogleOAuthProvider>
      </React.StrictMode>
);
