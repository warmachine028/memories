import { Provider } from 'react-redux'
import { ThemeProvider } from '@/providers'
import { store } from '@/store'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter, Navbar, PlaygroundFab, ScrollToTop, Snackbar } from '@/components'

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
	return (
		<Provider store={store}>
			<BrowserRouter>
				<MemoriesApp />
			</BrowserRouter>
		</Provider>
	)
}

export default App
