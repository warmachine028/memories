import { styled } from '@mui/material/styles'
import { deepPurple, red, yellow } from '@mui/material/colors'

import lightmode from '../../images/lightmode.png'
import darkmode from '../../images/darkmode.png';

const PREFIX = 'NavBar'
export const classes = {
	root: `${PREFIX}-root`,
	appBarLight: `${PREFIX}-appBarLight`,
	appBarDark: `${PREFIX}-appBarDark`,
	heading: `${PREFIX}-heading`,
	logo: `${PREFIX}-logo`,
	toolbar: `${PREFIX}-toolbar`,
	profile: `${PREFIX}-profile`,
	logout: `${PREFIX}-logout`,
	userName: `${PREFIX}-userName`,
	brandContainer: `${PREFIX}-brandContainer`,
	avatar: `${PREFIX}-avatar`,
	avaatar: `${PREFIX}-avaatar`,
	toggleDiv: `${PREFIX}-toggleDiv`,
	spanLight: `${PREFIX}-spanLight`,
	spanDark: `${PREFIX}-spanDark`,
}

export const Root = styled('div')(({ theme, floating }) => ({
	[`&.${classes.root}`]: {
		padding: '20px',
	},
	[`& .${classes.avaatar}`]: {
		margin: theme.spacing(1),
		height: '50px',
		width: '50px',
	},
	[`& .${classes.appBarLight}`]: {
		position: 'static',
		borderRadius: '20px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px',
		backgroundColor: 'rgba(255, 255, 255, 0.09)', //"transparent" //"rgba(69, 114, 200)"
		backdropFilter: 'blur(10px)',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
		[theme.breakpoints.down(360)]: {
			padding: '10px',
		},
	},
	[`& .${classes.appBarDark}`]: {
		position: 'static',
		borderRadius: '20px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px',
		backgroundColor: 'rgba(5, 5, 5, .90)', //"transparent" //"rgba(69, 114, 200)"
		backdropFilter: 'blur(10px)',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
		[theme.breakpoints.down(360)]: {
			padding: '10px',
		},
	},
	[`& .${classes.heading}`]: {
		height: floating ? 50 : 100,
		[theme.breakpoints.down(400)]: {
			width: '-webkit-fill-available',
		},
	},
	[`& .${classes.logo}`]: {
		marginLeft: '10px',
		marginTop: '5px',
		height: floating ? 30 : 60,
		[theme.breakpoints.down(400)]: {
			display: 'none',
		},
	},
	[`& .${classes.toolbar}`]: {
		display: 'flex',
		justifyContent: 'space-between',
		gap: '20px',
		[theme.breakpoints.down('md')]: {
			width: '-webkit-fill-available',
			justifyContent: 'center',
			display: floating ? 'none' : 'flex',
		},
		[theme.breakpoints.down(360)]: {
			display: 'block',
			justifyContent: 'space-between',
		},
	},
	[`& .${classes.profile}`]: {
		display: 'flex',
		justifyContent: 'space-between',
		width: 400,
		alignItems: 'center',
		gap: '10px',
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
			marginTop: 20,
			justifyContent: 'center',
		},
		[theme.breakpoints.down(360)]: {
			// display: 'none',
			justifyContent: 'space-between',
		},
	},
	[`& .${classes.logout}`]: {
		backgroundColor: 'black',
	},
	[`& .${classes.userName}`]: {
		display: 'flex',
		textAlign: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			width: 'max-content',
			maxWidth: '123px',
			alignItems: 'center',
			padding: '0 20px 0 20px',
		},
		[theme.breakpoints.down(360)]: {
			display: 'none',
		},
	},
	[`& .${classes.brandContainer}`]: {
		display: 'flex',
		alignItems: 'center',
	},
	[`& .${classes.avatar}`]: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
	[`& .${classes.toggleDiv}`]:{
		width: 30,
		height: 30,
		borderRadius: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		padding: '4px',
	},
	[`& .${classes.spanLight}`]:{
		width: '30px',
		height: '30px',
		border: 'none',
		borderRadius: '100%',
		backgroundImage: `url(${lightmode})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	},
	[`& .${classes.spanDark}`]:{
		width: '30px',
		height: '30px',
		border: 'none',
		borderRadius: '100%',
		backgroundImage: `url(${darkmode})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	}
}))

export default Root
