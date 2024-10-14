import { useSignIn } from '@clerk/clerk-react'
import { GitHub, Google } from '@mui/icons-material'
import { Box, Button, ButtonGroup, FormHelperText } from '@mui/material'
import { useState } from 'react'

const OAuthButtons = () => {
	const [error, setError] = useState('')
	const { isLoaded, signIn } = useSignIn()

	const handleOAuthSignIn = async (strategy) => {
		if (!isLoaded) {
			return
		}
		try {
			await signIn.authenticateWithRedirect({ strategy, redirectUrl: '/callback', redirectUrlComplete: '/' })
		} catch (error) {
			setError(error.errors[0].longMessage || 'An error occurred during OAuth sign-in')
		}
	}

	return (
		<ButtonGroup fullWidth orientation="vertical" aria-label="oauth-buttons">
			<FormHelperText error sx={{ m: 0 }}>
				{error}
			</FormHelperText>
			<Button variant="contained" color="secondary" startIcon={<Google />} onClick={() => handleOAuthSignIn('oauth_google')}>
				Sign in with Google
			</Button>
			<Button variant="outlined" startIcon={<GitHub />} onClick={() => handleOAuthSignIn('oauth_github')}>
				Sign in with GitHub
			</Button>
		</ButtonGroup>
	)
}

export default OAuthButtons
