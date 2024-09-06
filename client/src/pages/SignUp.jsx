import { Container } from '@mui/material'
import { SignUpForm } from '../components'

const SignUp = () => {
	return (
		<Container style={{ height: '100vh', display: 'flex', alignItems: 'center', width: '100%' }} maxWidth="xl">
			<SignUpForm />
		</Container>
	)
}

export default SignUp
