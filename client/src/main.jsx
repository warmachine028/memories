import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { unregister as serviceWorkerUnregister } from './serviceWorkerRegistration'
import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

serviceWorkerUnregister()
