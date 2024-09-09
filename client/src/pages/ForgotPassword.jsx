import { ForgotPasswordForm } from '@/components'
import { Container } from '@mui/material'

const ForgotPassword = () => {
	return (
		<Container
			style={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				width: '100%'
			}}
			maxWidth="xl"
		>
			<ForgotPasswordForm />
		</Container>
	)
}

export default ForgotPassword
