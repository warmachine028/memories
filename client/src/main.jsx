import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { unregister as serviceWorkerUnregister } from './serviceWorkerRegistration'
import App from './App'
import './styles/index.css'
import { SnackbarProvider } from './providers'

// const store = createStore(reducers, {}, compose(applyMiddleware(thunk)))
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<SnackbarProvider>
				<App />
			</SnackbarProvider>
		</BrowserRouter>
	</StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerUnregister()
