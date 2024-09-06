import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { unregister as serviceWorkerUnregister } from './serviceWorkerRegistration'
import { SnackbarProvider } from './providers'
import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<SnackbarProvider>
				<App />
			</SnackbarProvider>
		</BrowserRouter>
	</StrictMode>
)

serviceWorkerUnregister()
