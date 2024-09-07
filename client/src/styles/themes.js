import { createTheme } from '@mui/material'
import { deepmerge } from '@mui/utils'
const Light = createTheme({
	breakpoints: {},
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
			// MuiContainer: {
			// 	styleOverrides: {
			// 		root: {
			// 			backgroundColor: '#ffffff',
			// 		},
			// 	},
			// },
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
		// MuiContainer: {
		// 	styleOverrides: {
		// 		root: {
		// 			backgroundColor: '#000000',
		// 		},
		// 	},
		// },
	},
})

const System = createTheme({ colorSchemes: { dark: true } })

export { Light, Dark, System }
