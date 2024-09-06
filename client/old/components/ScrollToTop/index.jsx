import { useState, useEffect } from 'react'
import { Box, Fab, Fade } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'

// Floating Action Button to scroll to top
const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false)
	const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

	useEffect(() => {
		// Button is displayed after scrolling for 200 pixels
		const toggleVisibility = () => setIsVisible(window.pageYOffset > 200 ? true : false)
		window.addEventListener('scroll', toggleVisibility)
		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [])

	return (
		<Fade in={isVisible}>
			<Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
				<Fab size="small" aria-label="scroll back to top" color="primary">
					<KeyboardArrowUp />
				</Fab>
			</Box>
		</Fade>
	)
}

export default ScrollToTop
