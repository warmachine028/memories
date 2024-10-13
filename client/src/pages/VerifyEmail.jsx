import { useState } from 'react'
import { useSignUp } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { Mail } from '@mui/icons-material'
import { Button, TextField, Typography, Paper, Stack, FormControl, FormHelperText, Avatar, Container } from '@mui/material'

const VerifyEmail = () => {
	const { isLoaded, signUp, setActive } = useSignUp()
	const [verificationCode, setVerificationCode] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	if (!isLoaded || !signUp) {
		return null
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!isLoaded) {
			return
		}
		setError('')
		if (!verificationCode) {
			return setError('Please enter the verification code')
		}

		try {
			const result = await signUp.attemptEmailAddressVerification({
				code: verificationCode
			})

			if (result.status === 'complete') {
				await setActive({ session: result.createdSessionId })
				return navigate('/') // Redirect to home page after successful sign-in
			}
			console.error(JSON.stringify(result, null, 2))
			setError('Sign-up failed. Please try again.')
		} catch (error) {
			console.error('Verification error:', error)
			setError(error.errors?.[0]?.longMessage || 'An error occurred during verification')
		}
	}

	return (
		<Container maxWidth="xl">
			<Stack alignItems="center" minHeight="calc(100vh - 100px)" justifyContent="center">
				<Paper sx={{ padding: 2, width: '100vw', maxWidth: 400, margin: 'auto' }}>
					<Stack component="form" onSubmit={handleSubmit} alignItems="center" spacing={1}>
						<Avatar sx={{ bgcolor: { xs: 'secondary.main' } }}>
							<Mail />
						</Avatar>
						<Typography variant="h5">Verify Your Email</Typography>
						<Typography variant="body1">Please enter the verification code sent to your email.</Typography>
						<FormControl fullWidth error={!!error}>
							<TextField label="Verification Code" variant="outlined" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} fullWidth required />
							<FormHelperText>{error}</FormHelperText>
						</FormControl>
						<Button type="submit" variant="contained" fullWidth>
							Verify Email
						</Button>
					</Stack>
				</Paper>
			</Stack>
		</Container>
	)
}

export default VerifyEmail
