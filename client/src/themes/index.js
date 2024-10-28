import { createTheme } from '@mui/material'

const Light = createTheme({
	breakpoints: {},
	palette: {
		mode: 'light',
		primary: {
			main: '#3f51b5'
		},
		secondary: {
			main: '#f50057'
		},
		text: {
			secondary: {
				main: '#000000',
				muted: '#808080'
			}
		},
		background: {
			paper: '#ffffff',
			default: '#f5f5f5'
		}
	}
})

const Dark = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#5f57ff'
		},
		secondary: {
			main: '#ffffff'
		},
		text: {
			secondary: {
				main: '#ffffff',
				muted: '#808080'
			}
		},
		background: {
			paper: '#000000',
			default: '#0d1017'
		}
	}
})

export { Light, Dark }
