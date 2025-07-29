import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/i18n.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId='600157510000-vfpbk2eg720ggdohvlhamicug2mjd4a7.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
