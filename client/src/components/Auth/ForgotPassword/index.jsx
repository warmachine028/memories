import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress } from '@mui/material'
import { LockReset, Pattern } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { Root, classes } from './styles'
import { forgotPassword, setNewPassword } from '../../../actions/auth'
import Input from '../../Input'

const initialState = { email: '' }

const ForgotPassword = ({ snackBar }) => {
	const [showPassword, setShowPassword] = useState(false)
	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState(initialState)
	const params = useParams()
	const [resetPassword, setResetPassword] = useState(params.id && params.token)
	const dispatch = useDispatch()
	const history = useNavigate()
	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		const _function = resetPassword ? setNewPassword : forgotPassword
		dispatch(_function(formData, history, snackBar, setLoading))
	}
	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
	useEffect(() => {
		if (params.id && params.token) {
			formData.id = params.id
			formData.token = params.token
			setResetPassword(true)
		}
	}, [params])

	return (
		<Root className={classes.root} reset={resetPassword?.toString()}>
			<Container component="main" maxWidth="xs">
				<Paper className={classes.paper} elevation={6} style={{ marginTop: '260px' }}>
					<Avatar className={classes.avatar}>{resetPassword ? <Pattern /> : <LockReset />}</Avatar>
					<Typography variant="h5">{resetPassword ? 'Reset Password' : 'Account Recovery'}</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={1}>
							{resetPassword ? ( //
								<Input name="newPassword" label="New Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
							) : (
								<Input name="email" label="Email Address" onChange={handleChange} type="email" />
							)}
						</Grid>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading}>
							{loading && <CircularProgress size="1.5em" />}
							{resetPassword ? 'CONFIRM' : 'SEND PASSWORD RESET LINK'}
						</Button>
					</form>
				</Paper>
			</Container>
		</Root>
	)
}

export default ForgotPassword
