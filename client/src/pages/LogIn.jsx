import { Container, Button, Paper, TextField, Typography, Avatar, Stack, Divider, FormControl, FormHelperText } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined } from '@mui/icons-material'
import { useSignIn } from '@clerk/clerk-react'
import { OAuthButtons } from '@/components'
import { useState } from 'react'

const Form = () => {
	const initialState = { email: '', password: '' }
	const { isLoaded, signIn, setActive } = useSignIn()
	const [formData, setFormData] = useState(initialState)
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

	const handleSubmit = async (event) => {
		event.preventDefault()
		setError('')
		if (!isLoaded) {
			return
		}
		try {
			const result = await signIn.create({
				identifier: formData.email,
				password: formData.password
			})

			if (result.status === 'complete') {
				await setActive({ session: result.createdSessionId })
				navigate('/')
			} else {
				console.error('Sign-in failed', result)
				setError('Sign-in failed. Please try again.')
			}
		} catch (err) {
			setError(err.errors[0].longMessage || 'An error occurred during sign-in')
		}
	}

	return (
		<Stack component="form" onSubmit={handleSubmit} alignItems="center" spacing={1}>
			<Avatar sx={{ bgcolor: { xs: 'secondary.main' } }}>
				<LockOutlined />
			</Avatar>
			<Typography variant="h5">WELCOME BACK</Typography>
			<FormControl fullWidth>
				<TextField label="Email" variant="outlined" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} />
			</FormControl>
			<FormControl fullWidth>
				<TextField label="Password" variant="outlined" name="password" type="password" autoComplete="current-password" required value={formData.password} onChange={handleChange} />
			</FormControl>
			<FormHelperText error sx={{ m: 0 }}>
				{error}
			</FormHelperText>
			<Button variant="contained" type="submit" fullWidth>
				SIGN IN
			</Button>
			<Divider textAlign="center" sx={{ width: '100%' }}>
				OR
			</Divider>
			<OAuthButtons />
			<Button fullWidth to="/signup" LinkComponent={Link}>
				<Typography variant="subtitle2">Don&apos;t have an account? Sign Up</Typography>
			</Button>
		</Stack>
	)
}

const LogIn = () => {
	return (
		<Container maxWidth="xl">
			<Stack alignItems="center" minHeight="calc(100vh - 100px)" justifyContent="center">
				<Paper sx={{ p: 2, width: 'calc(100vw - 20px)', maxWidth: 400, m: { sm: 'auto' } }}>
					<Form />
				</Paper>
			</Stack>
		</Container>
	)
}

export default LogIn
