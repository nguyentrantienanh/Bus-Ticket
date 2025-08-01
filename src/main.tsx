import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/i18n.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''} >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
