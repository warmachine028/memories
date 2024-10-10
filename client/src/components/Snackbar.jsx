import { useDispatch, useSelector } from 'react-redux'
import { Alert, Snackbar as MUISnackbar, Slide } from '@mui/material'
import { closeSnackbar } from '@/reducers/notif'
import { useCallback } from 'react'

const Snackbar = () => {
	const dispatch = useDispatch()
	const reducer = useSelector((state) => state.notification)
	const { message, open, severity } = reducer
	const handleClose = useCallback(() => {
		dispatch(closeSnackbar())
	}, [dispatch])

	return (
		<MUISnackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={open}
			autoHideDuration={5000}
			onClose={handleClose}
			TransitionComponent={Slide}
			TransitionProps={{
				direction: 'left'
			}}
		>
			<Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
				{message}
			</Alert>
		</MUISnackbar>
	)
}

export default Snackbar
