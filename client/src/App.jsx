import { Provider } from 'react-redux'
import { store } from './store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AppRouter, Navbar } from './components'
import { Alert, Snackbar } from '@mui/material'
import { useSnackbar } from './hooks'
import { ThemeProvider } from './providers'

const App = () => {
	const {
		snackBarProps: { message, onClose, open, alertSeverity },
	} = useSnackbar()

	return (
		<Provider store={store}>
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
				<ThemeProvider>
					<Navbar />
					<AppRouter />
					<Snackbar autoHideDuration={3000} onClose={onClose} open={open}>
						<Alert onClose={onClose} severity={alertSeverity} variant="filled" sx={{ width: '100%' }}>
							{message}
						</Alert>
					</Snackbar>
				</ThemeProvider>
			</GoogleOAuthProvider>
		</Provider>
	)
}

export default App
