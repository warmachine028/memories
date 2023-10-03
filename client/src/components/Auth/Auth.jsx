import jwtDecode from 'jwt-decode'
import { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Button, Paper, Grid, Typography, Container, Checkbox } from '@mui/material'
import { GoogleLogin as GoogleLogins } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { Root, classes } from './styles'
import { googleSignIn, signin, signup } from '../../actions/auth'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Input from '../Input'
import UserIcon from '../UserIcon/UserIcon'
import { styled } from '@mui/material/styles'
import { SnackbarContext } from '../../contexts/SnackbarContext'
import { ModeContext } from '../../contexts/ModeContext'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', remember: false }

const Auth = () => {
	const { openSnackBar: snackBar } = useContext(SnackbarContext)

	const [showPassword, setShowPassword] = useState(false)
	const [isSignup, setIsSignUp] = useState(false)
	const [formData, setFormData] = useState(initialState)
	const [margin, setMargin] = useState('200px')

	const dispatch = useDispatch()
	const history = useNavigate()
	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
	const handleRememberMe = () => setFormData({ ...formData, remember: !formData.remember })
	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch((isSignup ? signup : signin)(formData, history, snackBar))
	}
	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp)
		setShowPassword(false)
	}
	const googleSuccess = ({ credential: token }) => {
		try {
			const { email, family_name: familyName, given_name: givenName, sub, picture: image, name } = jwtDecode(token)
			const googleId = sub.padStart(24, '0')
			const result = { email, familyName, givenName, googleId, image, name }
			dispatch(googleSignIn({ result, token }, history, snackBar))
		} catch (error) {
			snackBar('error', error)
		}
	}
	const googleFailure = ({ error }) => {
		if (error === 'popup_closed_by_user') {
			return snackBar('warning', 'PopUp Closed By User')
		}
		snackBar('error', 'Google Sign In was unsuccessful. Try Again Later')
	}

	useEffect(() => setMargin(isSignup ? '50px' : '200px'), [isSignup])

	const { mode } = useContext(ModeContext)

	return (
		<Root className={classes.root}>
			<Container component="main" maxWidth="xs">
				<Paper className={`${classes.paperLight} ${mode === 'light' ? classes.paperLight : classes.paperDark}`} elevation={6} style={{ marginTop: margin }}>
					{isSignup ? (
						<UserIcon formData={formData} setFormData={setFormData} />
					) : (
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
					)}
					<Typography sx={{ color: 'white' }} variant="h5">
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={1}>
							{isSignup && (
								<>
									<Input name="firstName" label="First Name" onChange={handleChange} half />
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
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<GoogleLogins onSuccess={googleSuccess} onFailure={googleFailure} width="300px" theme="filled_blue" />
						</div>
						<Grid container justifyContent="center">
							<Grid item>
								<Button onClick={switchMode}>{isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
							</Grid>
						</Grid>
						<Grid container justifyContent="space-between" display={isSignup ? 'none' : 'flex'}>
							<Button style={{ paddingLeft: 0 }} onClick={handleRememberMe} disableElevation disableRipple>
								<BpCheckbox checked={formData.remember} />
								Remember Me
							</Button>
							<Button component={Link} to="forgotPassword">
								Forgot Password
							</Button>
						</Grid>
					</form>
				</Paper>
			</Container>
		</Root>
	)
}

const BpIcon = styled('span')(({ theme }) => ({
	borderRadius: 3,
	width: 16,
	height: 16,
	boxShadow: theme.palette.mode === 'dark' ? '0 0 0 1px rgb(16 22 26 / 40%)' : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
	backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
	backgroundImage: theme.palette.mode === 'dark' ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))' : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
	'.Mui-focusVisible &': {
		outline: '2px auto rgba(19,124,189,.6)',
		outlineOffset: 2,
	},
	'input:hover ~ &': {
		backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
	},
	'input:disabled ~ &': {
		boxShadow: 'none',
		background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
	},
}))

const BpCheckedIcon = styled(BpIcon)({
	backgroundColor: '#137cbd',
	backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
	'&:before': {
		display: 'block',
		width: 16,
		height: 16,
		backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
		content: '""',
	},
	'input:hover ~ &': {
		backgroundColor: '#106ba3',
	},
})

const BpCheckbox = (props) => {
	return (
		<Checkbox
			sx={{
				'&:hover': { bgcolor: 'transparent' },
			}}
			checked={props.checked}
			disableRipple
			color="default"
			checkedIcon={<BpCheckedIcon />}
			icon={<BpIcon />}
			inputProps={{ 'aria-label': 'Checkbox demo' }}
			{...props}
		/>
	)
}

export default Auth
