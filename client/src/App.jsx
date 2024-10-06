import { Provider } from 'react-redux'
import { ThemeProvider } from '@/providers'
import { store } from '@/store'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter, Navbar, PlaygroundFab, ScrollToTop, Snackbar } from '@/components'

const MemoriesApp = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<AppRouter />
			<Snackbar />
			<ScrollToTop />
			<PlaygroundFab />
		</BrowserRouter>
	)
}

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<MemoriesApp />
			</ThemeProvider>
		</Provider>
	)
}

export default App
