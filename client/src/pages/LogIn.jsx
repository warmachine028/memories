import { Container, Stack } from '@mui/material'
import { SignIn } from '@clerk/clerk-react'
// import { LogInForm } from '@/components'

const LogIn = () => {
	return (
		<Container maxWidth="xl">
			{/* <LogInForm /> */}
			<Stack alignItems="center" minHeight="calc(100vh - 100px)" justifyContent="center">
				<SignIn path="/login" routing="path" signUpUrl="signup" />
			</Stack>
		</Container>
	)
}

export default LogIn
