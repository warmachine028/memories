import { Button } from '@mui/material'
import { useSnackbar } from '../hooks'

const Posts = () => {
	const { openSnackBar } = useSnackbar()
	const handleClick = () => openSnackBar('warning', 'This is a success message')
	return (
		<main
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Button variant="contained" onClick={handleClick}>
				Open Snackbar
			</Button>
		</main>
	)
}

export default Posts
