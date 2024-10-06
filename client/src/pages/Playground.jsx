import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { openSnackbar } from '@/reducers/notif'
import { SuspenseFallback, ThemeSwitch } from '@/components'
import { Suspense, useCallback } from 'react'
import { useDispatch } from 'react-redux'

const Playground = () => {
	const dispatch = useDispatch()

	const handleClick = useCallback(() => {
		dispatch(openSnackbar({ message: 'This is a snackbar message', severity: 'success' }))
	}, [dispatch])
	return (
		<Suspense fallback={<SuspenseFallback />}>
			<Container maxWidth="xl" sx={{ p: { md: 10, xs: 0 } }}>
				<Paper sx={{ p: { xs: 5, md: 20 }, height: '100vh' }}>
					<Typography variant="h3" textAlign="left">
						Playground
					</Typography>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button variant="contained" onClick={handleClick}>
							Open Snackbar
						</Button>
						<ThemeSwitch />
					</Box>
				</Paper>
			</Container>
		</Suspense>
	)
}

export default Playground
