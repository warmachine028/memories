import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { AppRouter, Navbar, ScrollToTop, Snackbar } from './components'
import BottomBar from './components/Bottombar'

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<AppRouter />
			</BrowserRouter>
			<Snackbar />
			<ScrollToTop />
		</Provider>
	)
}

export default App
