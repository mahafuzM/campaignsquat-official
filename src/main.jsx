import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' 
import { GoogleOAuthProvider } from '@react-oauth/google';
import './axiosConfig'; // 🚀 Global Axios configuration ensuring correct localhost baseURL targeting (bypasses Vite proxy issues with image uploads)

// Use environment variable if available, otherwise fallback to the hardcoded ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "1062796568506-blfem8d0q52g23knafeov6652sch5doa.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)