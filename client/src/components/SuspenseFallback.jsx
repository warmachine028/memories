import { Box, CircularProgress, Stack, Typography } from '@mui/material'

const SuspenseFallback = () => {
	return (
		<Stack
			sx={{
				position: 'fixed',
				width: '100vw',
				height: '100vh',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 9999
			}}
		>
			<CircularProgress size={60} thickness={4} />
			<Typography variant="h6" sx={{ mt: 2, fontWeight: 'medium' }}>
				Loading...
			</Typography>
		</Stack>
	)
}

export default SuspenseFallback
