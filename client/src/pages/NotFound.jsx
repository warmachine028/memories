import { ArrowBackIosNewTwoTone } from '@mui/icons-material'
import { Container, Paper, Typography, Grid2 as Grid, Divider, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFoundTypography = () => {
	return (
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
	)
}

const NotFoundMessage = () => {
	return (
		<Stack textAlign={{ xs: 'center', md: 'left' }} alignItems="flex-start">
			<Typography variant="h3" gutterBottom>
				SORRY !
			</Typography>
			<Typography variant="h5">The page you are looking for is not found.</Typography>
			<Button startIcon={<ArrowBackIosNewTwoTone />} size="large" LinkComponent={Link} to="/" color="success">
				GO BACK
			</Button>
		</Stack>
	)
}

const NotFound = () => {
	return (
		<Container
			maxWidth="xl"
			sx={{
				height: '70vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				margin: '20px auto'
			}}
		>
			<Paper
				elevation={3}
				sx={{
					p: 3,
					textAlign: 'center',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: 500
				}}
			>
				<Grid container size={12}>
					<Grid size={{ xs: 12, md: 5.5 }}>
						<NotFoundTypography />
					</Grid>
					<Grid size={{ xs: 0, md: 1 }} justifyContent="center" container>
						<Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'block' } }} />
					</Grid>
					<Grid size={{ xs: 12, md: 5.5 }}>
						<NotFoundMessage />
					</Grid>
				</Grid>
			</Paper>
		</Container>
	)
}

export default NotFound
