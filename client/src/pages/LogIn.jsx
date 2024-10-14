import { Container, Button, ButtonGroup, Paper, TextField, Typography, Avatar, Stack, Divider, FormControl, FormHelperText } from '@mui/material'
import { Google, LockOutlined, GitHub } from '@mui/icons-material'
import { useSignIn } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LogIn = () => {
	const initialState = { email: '', password: '' }
	const initialErrorState = { email: '', password: '', clerkError: '' }
	const { isLoaded, signIn, setActive } = useSignIn()
	const [formData, setFormData] = useState(initialState)
	const [errors, setErrors] = useState(initialErrorState)
	const navigate = useNavigate()
	const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!isLoaded) {
			return
		}
		setErrors(initialErrorState)

		if (!formData.email) {
			return setErrors({ ...errors, email: 'Email is required' })
		}
		if (!formData.password) {
			return setErrors({ ...errors, password: 'Password is required' })
		}

		try {
			const result = await signIn.create({
				identifier: formData.email,
				password: formData.password
			})

			if (result.status === 'complete') {
				await setActive({ session: result.createdSessionId })
				return navigate('/') // Redirect to home page after successful sign-in
			}
			console.error('Sign-in failed', result)
			setErrors({ ...errors, clerkError: 'Sign-in failed. Please try again.' })
		} catch (error) {
			console.error('Sign-in error:', error)
			setErrors({ ...errors, clerkError: error.errors?.[0]?.longMessage || 'An error occurred during sign-in' })
		}
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
			setErrors({ ...errors, clerkError: error.errors?.[0]?.longMessage || 'An error occurred during OAuth sign-in' })
		}
	}

	return (
		<Container maxWidth="xl">
			<Stack alignItems="center" minHeight="calc(100vh - 100px)" justifyContent="center">
				<Paper sx={{ p: 2, width: 'calc(100vw - 20px)', maxWidth: 400, m: { sm: 'auto' } }}>
					<Stack component="form" onSubmit={handleSubmit} alignItems="center" spacing={1}>
						<Avatar sx={{ bgcolor: 'secondary.main' }}>
							<LockOutlined />
						</Avatar>
						<Typography variant="h5">WELCOME BACK</Typography>
						<FormControl error={Boolean(errors.email)} fullWidth>
							<TextField id="email" label="Email" variant="outlined" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} />
							<FormHelperText>{errors.email}</FormHelperText>
						</FormControl>
						<FormControl error={Boolean(errors.password)} fullWidth>
							<TextField id="password" label="Password" variant="outlined" name="password" type="password" autoComplete="current-password" required value={formData.password} onChange={handleChange} />
							<FormHelperText>{errors.password}</FormHelperText>
						</FormControl>
						<FormHelperText error>{errors.clerkError}</FormHelperText>
						<Button variant="contained" type="submit" fullWidth>
							SIGN IN
						</Button>
						<Divider textAlign="center" sx={{ width: '100%' }}>
							OR
						</Divider>
						<ButtonGroup fullWidth orientation="vertical" aria-label="Vertical button group">
							<Button variant="contained" color="secondary" startIcon={<Google />} onClick={() => handleOAuthSignIn('oauth_google')}>
								Sign in with Google
							</Button>
							<Button variant="outlined" startIcon={<GitHub />} onClick={() => handleOAuthSignIn('oauth_github')}>
								Sign in with GitHub
							</Button>
						</ButtonGroup>
						<Button fullWidth to="/signup" LinkComponent={Link} sx={{ ':hover': { backgroundColor: 'transparent' } }}>
							<Typography variant="subtitle2" sx={{ fontWeight: '400' }}>
								Don't have an account? Sign Up
							</Typography>
						</Button>
					</Stack>
				</Paper>
			</Stack>
		</Container>
	)
}

export default LogIn
