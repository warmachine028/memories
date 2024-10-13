import { AppRouter, Navbar, PlaygroundFab, ScrollToTop, Snackbar } from '@/components'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/providers'
import { Provider } from 'react-redux'
import { store } from '@/store'

const MemoriesApp = () => {
	return (
		<ThemeProvider>
			<Navbar />
			<AppRouter />
			<Snackbar />
			<ScrollToTop />
			<PlaygroundFab />
		</ThemeProvider>
	)
}

const App = () => {
	const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
	if (!PUBLISHABLE_KEY) {
		throw new Error('Missing Clerk Publishable Key')
	}
	return (
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<Provider store={store}>
				<BrowserRouter>
					<MemoriesApp />
				</BrowserRouter>
			</Provider>
		</ClerkProvider>
	)
}

export default App
