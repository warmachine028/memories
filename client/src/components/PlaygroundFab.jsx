import { Home } from '@mui/icons-material'
import { Box, Fab, Fade, SvgIcon } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { SiReact } from '@icons-pack/react-simple-icons'
const PlaygroundFab = () => {
	const { pathname } = useLocation()
	const destination = pathname === '/playground' ? '/' : '/playground'
	return (
		<Fade in>
			<Box role="presentation" position="fixed" bottom={70} left={16} zIndex={3} component={Link} to={destination}>
				<Fab size="medium" aria-label="scroll back to top" color="warning">
					{pathname === '/playground' ? (
						<Home />
					) : (
						<SvgIcon
							sx={{
								animation: 'spin 7s linear infinite',
								'@keyframes spin': {
									'0%': {
										transform: 'rotate(360deg)'
									},
									'100%': {
										transform: 'rotate(0deg)'
									}
								}
							}}
						>
							<SiReact />
						</SvgIcon>
					)}
				</Fab>
			</Box>
		</Fade>
	)
}

export default PlaygroundFab
