import { ArrowBackIosNewTwoTone } from '@mui/icons-material'
import { Container, Paper, Typography, Grid2 as Grid, Divider, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFoundTypography = () => {
	return (
		<Grid size={{ xs: 12, md: 5.5 }}>
			<Typography
				fontSize={{ md: 200 }}
				variant="h1"
				sx={{
					textShadow: '0 0 10px #fff, 0 0 13px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa',
					'@keyframes flicker': {
						'0%, 18%, 22%, 25%, 53%, 57%, 100%': {
							textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #0fa, 0 0 80px #0fa, 0 0 90px #0fa, 0 0 100px #0fa, 0 0 150px #0fa'
						},
						'20%, 24%, 55%': {
							textShadow: 'none'
						}
					},
					animation: 'flicker 1.5s infinite alternate',
					WebkitFontSmoothing: 'antialiased'
				}}
			>
				404
			</Typography>
		</Grid>
	)
}

const NotFoundDivider = () => {
	return (
		<Grid size={{ xs: 0, md: 1 }} justifyContent="center" container>
			<Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'block' } }} />
		</Grid>
	)
}

const NotFoundMessage = () => {
	return (
		<Grid size={{ xs: 12, md: 5.5 }} textAlign={{ xs: 'center', md: 'left' }} alignContent="center">
			<Typography variant="h3" gutterBottom>
				SORRY !
			</Typography>
			<Typography variant="h5">The page you are looking for is not found.</Typography>
			<Button startIcon={<ArrowBackIosNewTwoTone />} size="large" LinkComponent={Link} to="/" color="success">
				GO BACK
			</Button>
		</Grid>
	)
}

const NotFound = () => {
	return (
		<Container
			sx={{
				height: '70vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				margin: '20px auto'
			}}
		>
			<Paper
				variant="elevation"
				elevation={3}
				sx={{
					p: 3,
					textAlign: 'center',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: 500
				}}
			>
				<Grid container size={12}>
					<NotFoundTypography />
					<NotFoundDivider />
					<NotFoundMessage />
				</Grid>
			</Paper>
		</Container>
	)
}

export default NotFound
