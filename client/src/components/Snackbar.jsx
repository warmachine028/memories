import { Alert, Snackbar as MUISnackbar, Slide } from '@mui/material'
import { useStore } from '@/store'

const Snackbar = () => {
	const { snackbar, closeSnackbar } = useStore()
	const { message, open, severity } = snackbar

	return (
		<MUISnackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={open}
			autoHideDuration={5000}
			onClose={closeSnackbar}
			TransitionComponent={Slide}
			TransitionProps={{
				direction: 'left'
			}}
		>
			<Alert onClose={closeSnackbar} severity={severity} variant="filled" sx={{ width: '100%' }}>
				{message}
			</Alert>
		</MUISnackbar>
	)
}

export default Snackbar