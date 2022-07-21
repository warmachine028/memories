import { styled } from '@mui/material/styles'
import Image from '../images/background.jpg'

const PREFIX = 'App'
export const classes = {
	root: `${PREFIX}-root`,
	container: `${PREFIX}-container`,
	blur: `${PREFIX}-blur`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		backgroundImage: `url(${Image})`,
		// backgroundImage: `url(https://source.unsplash.com/1920x1080/?dark,night,technology)`,
		bacgroundSize: 'contain',
		backgroundPosition: 'center',
		backgroundAttachment: 'fixed',
		maxWidth: '100%',
		maxHeight: '100%',
		minHeight: '1200px',
		padding: '10px 5px',
		[theme.breakpoints.down(948)]: {
			backgroundPositionY: 'center',
			minHeight: '1080px',
		},
	},
	[`& .${classes.blur}`]: {
		minHeight: '1200px',
		[theme.breakpoints.down(948)]: {
			backgroundPositionY: 'center',
			minHeight: '100%',
		},
	},
}))

export default Root
