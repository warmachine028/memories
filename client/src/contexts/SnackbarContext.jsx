import { createContext, useState } from 'react'

export const SnackbarContext = createContext()

export const SnackbarProvider = ({ children }) => {
	const [snackBarMessage, setSnackBarMessage] = useState('')
	const [alertSeverity, setAlertSeverity] = useState('success')
	const [open, setOpen] = useState(false)

	const openSnackBar = (severity, message) => {
		setAlertSeverity(severity)
		setSnackBarMessage(message)
		setOpen(true)
	}

	const contextValue = {
		openSnackBar,
		snackBarProps: {
			open,
			setOpen,
			alertSeverity,
			snackBarMessage,
		},
	}

	return <SnackbarContext.Provider value={contextValue}>{children}</SnackbarContext.Provider>
}
