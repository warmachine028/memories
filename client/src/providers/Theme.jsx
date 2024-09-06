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
		background: {
			paper: '#ffffff',
			default: '#f5f5f5',
		},
		components: {
			MuiContainer: {
				styleOverrides: {
					root: {
						backgroundColor: '#ffffff',
					},
				},
			},
		},
	},
})

const Dark = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#5f57ff',
		},
		secondary: {
			main: '#ffffff',
		},
		background: {
			paper: '#000000',
			default: '#0d1017',
		},
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					backgroundColor: '#000000',
				},
			},
		},
	},
})

const System = createTheme({
	colorSchemes: {
		dark: true,
		light: true,
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

	const values = { switchTheme, Themes, mode }
	return (
		<ThemeContext.Provider value={values}>
			<MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
