import { Button, TextField, Typography, Paper, Stack, FormControl, FormHelperText, Avatar, Container } from '@mui/material'
import { MailOutlined } from '@mui/icons-material'
import { useSignUp } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const VerifyEmail = () => {
	const { isLoaded, signUp, setActive } = useSignUp()
	const [code, setCode] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		event.preventDefault()
		setError('')
		if (!isLoaded) {
			return
		}
		try {
			const result = await signUp.attemptEmailAddressVerification({ code })

			if (result.status === 'complete') {
				await setActive({ session: result.createdSessionId })
				return navigate('/')
			}
			console.error(JSON.stringify(result, null, 2))
			setError('Sign-up failed. Please try again.')
		} catch (error) {
			console.error('Verification error:', error)
			setError(error.errors[0].longMessage || 'An error occurred during verification')
		}
	}

	return (
		<Container maxWidth="xl">
			<Stack alignItems="center" minHeight="calc(100vh - 100px)" justifyContent="center">
				<Paper sx={{ p: 2, width: 'calc(100vw - 20px)', maxWidth: 400, m: { sm: 'auto' } }}>
					<Stack component="form" onSubmit={handleSubmit} alignItems="center" spacing={1}>
						<Avatar sx={{ bgcolor: { xs: 'secondary.main' } }}>
							<MailOutlined />
						</Avatar>
						<Typography variant="h5">Verify Email</Typography>
						<Typography variant="body1">Enter the verification code sent to your email.</Typography>
						<FormControl fullWidth>
							<TextField label="Verification Code" variant="outlined" value={code} onChange={(e) => setCode(e.target.value)} required error={Boolean(error)} />
						</FormControl>
						<FormHelperText sx={{ m: 0 }} error>
							{error}
						</FormHelperText>
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
