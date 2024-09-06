import { createTheme, useMediaQuery } from '@mui/material'
import { ThemeContext } from '../contexts'
import { ThemeProvider as MUIThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'

const Light = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f50057',
		},
	},
})

const Dark = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f50057',
		},
	},
})

const System = createTheme({
	colorSchemes: {
		dark: true,
	},
})

const ThemeProvider = ({ children }) => {
	const SystemDark = useMediaQuery('(prefers-color-scheme: dark)')
	// const System = SystemDark ? Dark : Light
	const [theme, setTheme] = useState(System)
	const Themes = {
		LIGHT: 'LIGHT',
		DARK: 'DARK',
		SYSTEM: 'SYSTEM',
	}
	const savedTheme = localStorage.getItem('theme') || Themes.SYSTEM
	const [mode, setMode] = useState(savedTheme)

	useEffect(() => {
		localStorage.setItem('theme', mode)
		switch (mode) {
			case Themes.DARK:
				setTheme(Dark)
				break
			case Themes.SYSTEM:
				setTheme(System)
				break
			default:
				setTheme(Light)
		}
	}, [mode])

	const switchTheme = (mode) => setMode(mode)

	const values = { theme, switchTheme, Themes }
	return (
		<ThemeContext.Provider value={values}>
			<MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
