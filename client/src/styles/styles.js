import { styled } from '@mui/material/styles'
import Image from '../images/background.jpg'

const PREFIX = 'App'
export const classes = {
	rootLight: `${PREFIX}-rootLight`,
	rootDark: `${PREFIX}-rootDark`,
	floatingNavbar: `${PREFIX}-floatingNavbar`,
	container: `${PREFIX}-container`,
	blur: `${PREFIX}-blur`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.rootLight}`]: {
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
	[`&.${classes.rootDark}`]: {
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
	[`& .${classes.floatingNavbar}`]: {
		borderRadius: '5px',
		margin: '0 16px 0 6px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// padding: '10px 50px',
		backgroundColor: 'rgba(255, 255, 255, .09)', //"transparent" //"rgba(69, 114, 200)"
		backdropFilter: 'blur(10px)',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
		[theme.breakpoints.down(360)]: {
			padding: '10px 30px',
		},
	},
}))

export default Root
