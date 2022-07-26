import { forwardRef } from 'react'
import { Snackbar, Alert } from '@mui/material'

const MuiAlert = forwardRef((props, ref) => <Alert elevation={6} ref={ref} variant="filled" {...props} />)

const SnackBar = ({ open, setOpen, alertSeverity, snackBarMessage }) => {
	const handleClose = () => setOpen(false)

	return (
		<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
			<MuiAlert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
				{snackBarMessage}
			</MuiAlert>
		</Snackbar>
	)
}

export default SnackBar
