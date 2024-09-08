import { useSnackbar } from '../hooks'
import { Alert, Snackbar as MUISnackbar } from '@mui/material'

const Snackbar = () => {
  const { snackBarProps } = useSnackbar()
  const { message, onClose, open, alertSeverity } = snackBarProps
  return (
    <MUISnackbar autoHideDuration={3000} onClose={onClose} open={open}>
      <Alert onClose={onClose} severity={alertSeverity} variant='filled' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MUISnackbar>
  )
}

export default Snackbar
