import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { unregister as serviceWorkerUnregister } from './serviceWorkerRegistration'
import { SnackbarProvider, ThemeProvider } from './providers'
import './styles/index.css'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider>
			<CssBaseline />
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
				<SnackbarProvider>
					<App />
				</SnackbarProvider>
			</GoogleOAuthProvider>
		</ThemeProvider>
	</StrictMode>
)

serviceWorkerUnregister()
