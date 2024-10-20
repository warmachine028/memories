import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { ThemeContext } from '@/contexts'
import { Light as lightTheme, Dark as darkTheme } from '@/themes'
import { useStore } from '@/store'

const ThemeProvider = ({ children }) => {
	const { theme, actualTheme, setActualTheme, setThemeAndActual, getCurrentTheme } = useStore()

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

		mediaQuery.addEventListener('change', handleSystemThemeChange)

		return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
	}, [theme, setActualTheme])

	const currentTheme = getCurrentTheme() === 'dark' ? darkTheme : lightTheme

	return (
		<ThemeContext.Provider value={{ theme, setTheme: setThemeAndActual, actualTheme }}>
			<MUIThemeProvider theme={currentTheme}>
				<CssBaseline enableColorScheme />
				{children}
			</MUIThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
