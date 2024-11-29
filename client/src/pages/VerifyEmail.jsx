import {
	Button,
	TextField,
	Typography,
	Paper,
	Stack,
	FormControl,
	FormHelperText,
	Avatar,
	Container
} from '@mui/material'
import { MailOutlined } from '@mui/icons-material'
import { useSignUp } from '@clerk/clerk-react'
import { useNavigate } from 'react-router'
import { useState } from 'react'

const Form = () => {
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
			const result = await signUp.attemptEmailAddressVerification({
				code
			})

			if (result.status === 'complete') {
				await setActive({ session: result.createdSessionId })
				navigate('/')
			} else {
				console.error(JSON.stringify(result, null, 2))
				setError('Sign-up failed. Please try again.')
			}
		} catch (err) {
			console.error('Verification error:', err)
			setError(
				err.errors[0].longMessage ||
					'An error occurred during verification'
			)
		}
	}

	const handleChange = (e) => setCode(e.target.value)

	return (
		<Stack
			component="form"
			onSubmit={handleSubmit}
			alignItems="center"
			spacing={1}
		>
			<Avatar sx={{ bgcolor: { xs: 'secondary.main' } }}>
				<MailOutlined />
			</Avatar>
			<Typography variant="h5">Verify Email</Typography>
			<Typography variant="body1">
				Enter the verification code sent to your email.
			</Typography>
			<FormControl fullWidth>
				<TextField
					label="Verification Code"
					variant="outlined"
					value={code}
					onChange={handleChange}
					required
					error={Boolean(error)}
				/>
			</FormControl>
			<FormHelperText sx={{ m: 0 }} error>
				{error}
			</FormHelperText>
			<Button type="submit" variant="contained" fullWidth>
				Verify Email
			</Button>
		</Stack>
	)
}

const VerifyEmail = () => {
	return (
		<Container maxWidth="xl">
			<Stack
				alignItems="center"
				minHeight="calc(100vh - 100px)"
				justifyContent="center"
			>
				<Paper
					sx={{
						p: 2,
						width: 'calc(100vw - 20px)',
						maxWidth: 400,
						m: { sm: 'auto' }
					}}
				>
					<Form />
				</Paper>
			</Stack>
		</Container>
	)
}

export default VerifyEmail
