import { Box, CircularProgress, Typography } from '@mui/material'

const SuspenseFallback = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'background.default',
				zIndex: 9999
			}}
		>
			<CircularProgress size={60} thickness={4} />
			<Typography variant="h6" sx={{ mt: 2, fontWeight: 'medium' }}>
				Loading...
			</Typography>
		</Box>
	)
}

export default SuspenseFallback
