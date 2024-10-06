import { useEffect, useState } from 'react'
import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from '@/contexts'
import { setThemeAction } from '@/reducers/theme'
import { Light as lightTheme, Dark as darkTheme } from '@/themes'

const ThemeProvider = ({ children }) => {
	const dispatch = useDispatch()
	const reduxTheme = useSelector((state) => state.theme)
	const [theme, setThemeState] = useState(() => {
		// Try to get the theme from localStorage, fallback to reduxTheme
		if (typeof window !== 'undefined') {
			return localStorage.getItem('theme') || reduxTheme
		}
		return reduxTheme
	})
	const [actualTheme, setActualTheme] = useState(reduxTheme === 'system' ? 'light' : reduxTheme)

	useEffect(() => {
		const handleSystemThemeChange = (event) => {
			if (theme === 'system') {
				setActualTheme(event.matches ? 'dark' : 'light')
			}
		}

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

		// Set initial theme
		if (theme === 'system') {
			setActualTheme(mediaQuery.matches ? 'dark' : 'light')
		} else {
			setActualTheme(theme)
		}

		// Use addEventListener instead of addListener
		mediaQuery.addEventListener('change', handleSystemThemeChange)

		// Clean up the event listener
		return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
	}, [theme])

	useEffect(() => {
		// Sync Redux state with localStorage
		dispatch(setThemeAction(theme))
		localStorage.setItem('theme', theme)
	}, [theme, dispatch])

	const setTheme = (newTheme) => {
		setThemeState(newTheme)
		if (newTheme !== 'system') {
			setActualTheme(newTheme)
		}
	}

	const currentTheme = actualTheme === 'dark' ? darkTheme : lightTheme

	return (
		<ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
			<MUIThemeProvider theme={currentTheme}>
				<CssBaseline />
				{children}
			</MUIThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
