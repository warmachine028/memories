import { styled } from '@mui/material/styles'
import { deepPurple, red, yellow } from '@mui/material/colors'

import lightmodeIcon from '../../images/lightmodeIcon.png'
import darkmodeIcon from '../../images/darkmodeIcon.png';

const PREFIX = 'NavBar'
export const classes = {
	root: `${PREFIX}-root`,
	appBarLight: `${PREFIX}-appBarLight`,
	appBarDark: `${PREFIX}-appBarDark`,
	heading: `${PREFIX}-heading`,
	logo: `${PREFIX}-logo`,
	toolbar: `${PREFIX}-toolbar`,
	profile: `${PREFIX}-profile`,
	authButtonLight: `${PREFIX}-authButtonLight`,
	authButtonDark: `${PREFIX}-authButtonDark`,
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
		paddingRight: '10px',
	},
	[`& .${classes.avaatar}`]: {
		margin: theme.spacing(1),
		height: '50px',
		width: '50px',
	},
	[`& .${classes.appBarLight}`]: {
		position: 'static',
		borderRadius: '5px',
		margin: '0 16px 0 6px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 50px',
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
		backgroundColor: 'rgba(5, 5, 5, .90)', //"transparent" //"rgba(69, 114, 200)"
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
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '30px',
		[theme.breakpoints.down('md')]: {
			width: '-webkit-fill-available',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '40px',
			// display: floating ? 'none' : 'flex',
		},
		[theme.breakpoints.down(600)]: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '20px',
		},
	},
	[`& .${classes.profile}`]: {
		display: 'flex',
		justifyContent: 'space-between',
		width: 400,
		alignItems: 'center',
		gap: '20px',
		[theme.breakpoints.down(600)]: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: '10px',
		},
		[theme.breakpoints.down(390)]: {
			// display: 'none',
			width: '-webkit-fill-available',
			justifyContent: 'space-evenly',
		},
	},
	[`& .${classes.authButtonLight}`]: {
		backgroundColor: 'black',
	},
	[`& .${classes.authButtonDark}`]: {
		backgroundColor: 'white',
		color: 'black',
	},
	[`& .${classes.userName}`]: {
		display: 'flex',
		textAlign: 'center',
		alignItems: 'center',
		[theme.breakpoints.down(390)]: {
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
		backgroundImage: `url(${lightmodeIcon})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	},
	[`& .${classes.spanDark}`]:{
		width: '30px',
		height: '30px',
		border: 'none',
		borderRadius: '100%',
		backgroundImage: `url(${darkmodeIcon})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	}
}))

export default Root
