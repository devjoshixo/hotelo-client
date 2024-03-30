import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthState from './context/AuthState.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthState>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_REACT_APP_CLIENT_ID}
        >
          <App />
        </GoogleOAuthProvider>
      </AuthState>
    </BrowserRouter>
  </React.StrictMode>
);
