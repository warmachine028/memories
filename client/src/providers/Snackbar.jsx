import { useState } from 'react'
import { SnackbarContext } from '../contexts'

const SnackbarProvider = ({ children }) => {
	const [message, setMessage] = useState('')
	const [alertSeverity, setAlertSeverity] = useState('success')
	const [open, setOpen] = useState(false)

	const openSnackBar = (severity, message) => {
		setAlertSeverity(severity)
		setMessage(message)
		setOpen(true)
	}

	const value = {
		openSnackBar,
		snackBarProps: {
			open,
			alertSeverity,
			message,
			onClose: () => setOpen(false),
		},
	}

	return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>
}

export default SnackbarProvider
