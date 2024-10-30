import { createTheme } from '@mui/material'

const baseTheme = createTheme({
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h1: {
			fontSize: '2.5rem',
			fontWeight: 700
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 600
		},
		body1: {
			fontSize: '1rem',
			lineHeight: 1.5
		}
	},
	shape: {
		borderRadius: 4
	}
})

const Light = createTheme({
	...baseTheme,
	palette: {
		mode: 'light',
		primary: {
			main: '#3a86ff'
		},
		secondary: {
			main: '#f72585'
		},
		background: {
			default: '#f3f4f6',
			paper: '#ffffff'
		},
		text: {
			primary: '#1f2937',
			secondary: '#4b5563',
			muted: '#6b7280'
		}
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundAttachment: 'fixed',
					backgroundSize: 'cover'
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow:
						'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
				}
			}
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					color: '#1f2937',
					backgroundColor: 'rgba(255, 255, 255, 0.8)',
					backdropFilter: 'blur(10px)',
					WebkitBackdropFilter: 'blur(10px)', // For Safari
					boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					boxShadow:
						'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
				}
			}
		}
	}
})

const Dark = createTheme({
	...baseTheme,
	palette: {
		mode: 'dark',
		primary: {
			main: '#3a86ff'
		},
		secondary: {
			main: '#f72585'
		},
		background: {
			paper: '#000000',
			default: '#0d1017'
		},
		text: {
			primary: '#f3f4f6',
			secondary: '#d1d5db',
			muted: '#6b7280'
		}
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundAttachment: 'fixed',
					backgroundSize: 'cover'
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					border: '1px solid',
					borderColor: 'rgba(255, 255, 255, 0.12)',
					boxShadow: 'none'
				}
			},
			defaultProps: {
				elevation: 0
			}
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					color: '#f3f4f6',
					border: '1px solid',
					borderColor: 'rgba(255, 255, 255, 0.12)',
					backgroundColor: 'rgba(13, 16, 23, 0.8)',
					backdropFilter: 'blur(10px)',
					WebkitBackdropFilter: 'blur(10px)' // For Safari
				}
			},
			defaultProps: {
				elevation: 0
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					border: '1px solid',
					borderColor: 'rgba(255, 255, 255, 0.12)',
					boxShadow: 'none'
				}
			},
			defaultProps: {
				elevation: 0
			}
		}
	}
})

export { Light, Dark }
