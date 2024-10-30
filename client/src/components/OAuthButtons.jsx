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
			await signIn.authenticateWithRedirect({
				strategy,
				redirectUrl: '/callback',
				redirectUrlComplete: '/'
			})
		} catch (err) {
			setError(
				err.errors[0].longMessage ||
					'An error occurred during OAuth sign-in'
			)
		}
	}

	return (
		<Box width={1}>
			<FormHelperText error sx={{ m: 0 }}>
				{error}
			</FormHelperText>
			<ButtonGroup
				fullWidth
				orientation="vertical"
				aria-label="oauth-buttons"
				variant="contained"
			>
				<Button
					color="secondary"
					startIcon={<Google />}
					onClick={() => handleOAuthSignIn('oauth_google')}
					style={{ border: 0 }}
				>
					Sign in with Google
				</Button>
				<Button
					sx={{ backgroundColor: 'transparent', border: '1px solid' }}
					startIcon={<GitHub />}
					onClick={() => handleOAuthSignIn('oauth_github')}
				>
					Sign in with GitHub
				</Button>
			</ButtonGroup>
		</Box>
	)
}

export default OAuthButtons
