import { Button, ButtonGroup, Container, Paper, Typography } from '@mui/material'
import { useSnackbar } from '../hooks'
import { ThemeSwitch } from '../components'

const PlayGround = () => {
	const { openSnackBar } = useSnackbar()
	const handleClick = () => openSnackBar('success', 'This is a success message')
	return (
		<Container
			maxWidth="xl"
			sx={{
				padding: 10,
			}}
		>
			<Paper sx={{ padding: 20 }}>
				<Typography variant="h3" textAlign="left">
					Playground
				</Typography>
				<ButtonGroup variant="contained">
					<Button variant="contained" onClick={handleClick}>
						Open Snackbar
					</Button>
					<ThemeSwitch />
				</ButtonGroup>
			</Paper>
		</Container>
	)
}

export default PlayGround
