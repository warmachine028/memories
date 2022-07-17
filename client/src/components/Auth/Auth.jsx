import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { Root, classes } from './styles'
import { signin, signup } from '../../actions/auth'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Input from '../Input'
import Icon from './Icon'
import UserIcon from '../UserIcon/UserIcon'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

const Auth = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [isSignup, setIsSignUp] = useState(false)
	const [formData, setFormData] = useState(initialState)
	const [margin, setMargin] = useState('200px')

	const dispatch = useDispatch()
	const history = useNavigate()
	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch((isSignup ? signup : signin)(formData, history))
	}
	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp)
		setShowPassword(false)
	}
	const googleSuccess = async (res) => {
		const result = res?.profileObj
		const token = res?.tokenId

		try {
			dispatch({ type: 'AUTH', data: { result, token } })
			history('/')
		} catch (error) {
			console.log(error)
		}
	}
	const googleFailure = (error) => {
		console.log(error)
		alert('Google Sign In was unsuccessful. Try Again Later')
	}

	useEffect(() => setMargin(isSignup ? '50px' : '200px'), [isSignup])

	return (
		<Root className={classes.root}>
			<Container component="main" maxWidth="xs">
				<Paper className={classes.paper} elevation={6} style={{ marginTop: margin }}>
					{isSignup ? (
						<UserIcon formData={formData} setFormData={setFormData} />
					) : (
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
					)}
					<Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={1}>
							{isSignup && (
								<>
									<Input name="firstName" label="First Name" onChange={handleChange} autoFocus half />
									<Input name="lastName" label="Last Name" onChange={handleChange} half />
								</>
							)}
							<Input name="email" label="Email Address" onChange={handleChange} type="email" />
							<Input name="password" label="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
							{isSignup && <Input name="confirmPassword" label="Repeat Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />}
						</Grid>

						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							{isSignup ? 'SIGN UP' : 'SIGN IN'}
						</Button>

						<GoogleLogin
							clientId={CLIENT_ID}
							render={(renderProps) => (
								<Button className={classes.googleButton} onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} color="primary" variant="contained" fullWidth>
									GOOGLE SIGN IN
								</Button>
							)}
							onSuccess={googleSuccess}
							onFailure={googleFailure}
							cookiePolicy="single_host_origin"
						/>

						<Grid container justifyContent="center">
							<Grid item>
								<Button onClick={switchMode}>{isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Container>
		</Root>
	)
}

export default Auth
