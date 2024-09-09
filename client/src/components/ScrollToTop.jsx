import { useCallback } from 'react'
import { Box, Fab, Fade, Tooltip, useScrollTrigger } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'

// Floating Action Button to scroll to top
const ScrollToTop = () => {
	const handleClick = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])
	const trigger = useScrollTrigger()

	return (
		<Fade in={trigger}>
			<Tooltip title="Scroll to top" placement="left" arrow>
				<Box onClick={handleClick} role="presentation" bottom={70} right={16} zIndex={3} position="fixed">
					<Fab size="medium" aria-label="scroll back to top" color="primary">
						<KeyboardArrowUp />
					</Fab>
				</Box>
			</Tooltip>
		</Fade>
	)
}

export default ScrollToTop
