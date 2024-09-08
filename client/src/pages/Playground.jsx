import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { useSnackbar } from '../hooks'
import { SuspenseFallback, ThemeSwitch } from '../components'

const Playground = () => {
  const { openSnackBar } = useSnackbar()
  const handleClick = () => openSnackBar('success', 'This is a success message')
  return (
    <Container maxWidth='xl' sx={{ p: { md: 10, xs: 0 } }}>
      <Paper sx={{ p: { xs: 5, md: 20 }, height: '100vh' }}>
        <Typography variant='h3' textAlign='left'>
          Playground
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant='contained' onClick={handleClick}>
            Open Snackbar
          </Button>
          <ThemeSwitch />
        </Box>
      </Paper>
      <SuspenseFallback />
    </Container>
  )
}

export default Playground
