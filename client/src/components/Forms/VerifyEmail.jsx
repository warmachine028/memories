import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Typography, Paper, Stack, FormControl, FormHelperText, Avatar } from '@mui/material'
import { Mail } from '@mui/icons-material'

const VerifyEmail = () => {
	const { isLoaded, signUp, setActive } = useSignUp()
	const [verificationCode, setVerificationCode] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	if (!isLoaded || !signUp) {
		return null
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!verificationCode) {
			return setError('Please enter the verification code')
		}

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({ code: verificationCode })
			if (completeSignUp.status !== 'complete') {
				console.log(JSON.stringify(completeSignUp, null, 2))
			}
			if (completeSignUp.status === 'complete') {
				await setActive({ session: completeSignUp.createdSessionId })
				navigate('/') // Redirect to dashboard or home page
			}
		} catch (err) {
			console.error('Error verifying email', err)
			setError(err.message || 'An error occurred during verification')
		}
	}

	return (
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
	)
}

export default VerifyEmail
