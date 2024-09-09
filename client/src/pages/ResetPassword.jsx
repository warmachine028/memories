import { ResetPasswordForm } from '@/components'
import { Container } from '@mui/material'

const ResetPassword = () => {
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
			<ResetPasswordForm />
		</Container>
	)
}

export default ResetPassword
