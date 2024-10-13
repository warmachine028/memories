import { Container, Stack } from '@mui/material'
import { VerifyEmailForm } from '../components'

const VerifyEmail = () => {
	return (
		<Container maxWidth="xl">
			<Stack alignItems="center" minHeight="calc(100vh - 100px)" justifyContent="center">
				<VerifyEmailForm />
			</Stack>
		</Container>
	)
}

export default VerifyEmail
