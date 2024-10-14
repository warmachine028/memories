import { Button, Container, Paper, Stack, Typography } from '@mui/material'
import { openSnackbar } from '@/reducers/notif'
import { SuspenseFallback, ThemeSwitch } from '@/components'
import { Suspense, useCallback } from 'react'
import { useDispatch } from 'react-redux'

const Content = ({ onClick: handleClick }) => (
	<Paper sx={{ p: { xs: 5, md: 20 }, height: '100vh' }}>
		<Typography variant="h3" textAlign="left">
			Playground
		</Typography>
		<Stack spacing={2}>
			<Button variant="contained" onClick={handleClick}>
				Open Snackbar
			</Button>
			<ThemeSwitch />
		</Stack>
	</Paper>
)

const Playground = () => {
	const dispatch = useDispatch()

	const handleClick = useCallback(() => {
		dispatch(openSnackbar({ message: 'This is a snackbar message', severity: 'success' }))
	}, [dispatch])

	return (
		<Suspense fallback={<SuspenseFallback />}>
			<Container maxWidth="xl" sx={{ p: { md: 10, xs: 0 } }}>
				<Content onClick={handleClick} />
			</Container>
		</Suspense>
	)
}

export default Playground
