import { AppRouter, Navbar, ScrollToTop, Snackbar } from '@/components'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const MemoriesApp = () => {
	return (
		<ThemeProvider>
			<Navbar />
			<AppRouter />
			<Snackbar />
			<ScrollToTop />
		</ThemeProvider>
	)
}

const App = () => {
	const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
	if (!PUBLISHABLE_KEY) {
		throw new Error('Missing Clerk Publishable Key')
	}
	const queryClient = new QueryClient()

	return (
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter
					future={{
						v7_startTransition: true,
						v7_relativeSplatPath: true
					}}
				>
					<MemoriesApp />
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ClerkProvider>
	)
}

export default App
