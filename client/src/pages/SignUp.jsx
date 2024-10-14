import { Google, LockOutlined, GitHub } from '@mui/icons-material'
import { Container, Button, ButtonGroup, Paper, TextField, Typography, Avatar, Grid2 as Grid, Stack, Divider, FormControl, FormHelperText } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignUp, useSignIn } from '@clerk/clerk-react'

const SignUp = () => {
	const initialState = { firstName: '', lastName: '', email: '', password: '', repeatPassword: '' }
	const initialErrorState = { firstName: '', lastName: '', email: '', password: '', repeatPassword: '', clerkError: '' }
	const { isLoaded, signUp } = useSignUp()
	const { signIn } = useSignIn()
	const [formData, setFormData] = useState(initialState)
	const [errors, setErrors] = useState(initialErrorState)
	const navigate = useNavigate()

	const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

	const attemptSignUp = async (data) => {
		if (!isLoaded) {
			return
		}
		try {
			await signUp.create({
				firstName: data.firstName,
				lastName: data.lastName,
				emailAddress: data.email,
				password: data.password
			})
			await signUp.prepareVerification({ strategy: 'email_code' })
			navigate('/verify-email')
		} catch (error) {
			setErrors({ ...errors, clerkError: error.errors[0].longMessage })
		}
	}
	const handleSubmit = (event) => {
		setErrors(initialErrorState)
		event.preventDefault()
		if (!/^[A-Za-z]+$/.test(formData.firstName)) {
			return setErrors({ ...errors, firstName: 'Name must contain only letters' })
		}
		if (!/^[A-Za-z]+$/.test(formData.lastName)) {
			return setErrors({ ...errors, lastName: 'Name must contain only letters' })
		}
		if (formData.firstName.length < 2) {
			return setErrors({ ...errors, firstName: 'Name must be at least 2 characters long' })
		}
		if (formData.lastName.length < 2) {
			return setErrors({ ...errors, lastName: 'Name must be at least 2 characters long' })
		}
		if (formData.password.length < 8) {
			return setErrors({ ...errors, password: 'Password must be at least 8 characters long' })
		}
		if (formData.password !== formData.repeatPassword) {
			return setErrors({ ...errors, repeatPassword: 'Passwords do not match' })
		}
		attemptSignUp(formData)
	}

	const handleOAuthSignIn = async (strategy) => {
		if (!isLoaded) {
			return
		}

		try {
			await signIn.authenticateWithRedirect({
				strategy,
				redirectUrl: '/callback',
				redirectUrlComplete: '/'
			})
		} catch (error) {
			setErrors({ ...errors, clerkError: error.errors[0].longMessage })
		}
	}
	return (
		<Container maxWidth="xl">
			<Stack alignItems="center" minHeight="calc(100vh - 100px)" justifyContent="center">
				<Paper sx={{ p: 2, width: 'calc(100vw - 20px)', maxWidth: 400, m: { sm: 'auto' } }}>
					<Stack component="form" onSubmit={handleSubmit} alignItems="center" spacing={1}>
						<Avatar sx={{ bgcolor: { xs: 'secondary.main' } }}>
							<LockOutlined />
						</Avatar>
						<Typography variant="h5">JOIN US NOW</Typography>
						<Stack width="100%" spacing={1} marginBottom="9px">
							<Grid container size={{ xs: 12, md: 12, xl: 3 }} spacing={1}>
								<Grid size={{ xs: 12, md: 6 }}>
									<FormControl className="mb-3" error={Boolean(errors.firstName)} fullWidth>
										<TextField id="first-name" label="First Name" variant="outlined" name="firstName" type="text" autoComplete="given-name" required value={formData.firstName} onChange={handleChange} />
										<FormHelperText>{errors.firstName}</FormHelperText>
									</FormControl>
								</Grid>
								<Grid size={{ xs: 12, md: 6 }}>
									<FormControl className="mb-3" error={Boolean(errors.lastName)} fullWidth>
										<TextField id="last-name" label="Last Name" variant="outlined" name="lastName" type="text" autoComplete="family-name" required value={formData.lastName} onChange={handleChange} />
										<FormHelperText>{errors.lastName}</FormHelperText>
									</FormControl>
								</Grid>
							</Grid>
							<FormControl error={Boolean(errors.email)}>
								<TextField id="email" label="Email" variant="outlined" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} />
								<FormHelperText>{errors.email}</FormHelperText>
							</FormControl>
							<FormControl error={Boolean(errors.password)}>
								<TextField id="password" label="Password" variant="outlined" name="password" type="password" autoComplete="password" required value={formData.password} onChange={handleChange} />
								<FormHelperText>{errors.password}</FormHelperText>
							</FormControl>
							<FormControl error={Boolean(errors.repeatPassword)}>
								<TextField id="repeat-password" label="Repeat Password" variant="outlined" name="repeatPassword" type="password" autoComplete="off" required value={formData.repeatPassword} onChange={handleChange} />
								<FormHelperText>{errors.repeatPassword}</FormHelperText>
							</FormControl>
						</Stack>
						<FormHelperText error>{errors.clerkError}</FormHelperText>
						<Button variant="contained" type="submit" fullWidth>
							CREATE ACCOUNT
						</Button>
						<Divider textAlign="center">OR</Divider>
						<ButtonGroup fullWidth orientation="vertical" aria-label="Vertical button group">
							<Button variant="contained" color="secondary" startIcon={<Google />} onClick={() => handleOAuthSignIn('oauth_google')}>
								Sign in with Google
							</Button>
							<Button variant="outlined" startIcon={<GitHub />} onClick={() => handleOAuthSignIn('oauth_github')}>
								Sign in with GitHub
							</Button>
						</ButtonGroup>
						<Button fullWidth to="/login" LinkComponent={Link} sx={{ ':hover': { backgroundColor: 'transparent' } }}>
							<Typography variant="subtitle2" sx={{ fontWeight: { xs: '12px' } }}>
								Already have an account? Log In
							</Typography>
						</Button>
					</Stack>
				</Paper>
			</Stack>
		</Container>
	)
}

export default SignUp
