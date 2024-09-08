import { Container } from '@mui/material'
import { LogInForm } from '../components'

const LogIn = () => {
  return (
    <Container
      style={{
			  height: '100vh',
			  display: 'flex',
			  alignItems: 'center',
			  width: '100%'
      }}
      maxWidth='xl'
    >
      <LogInForm />
    </Container>
  )
}

export default LogIn
