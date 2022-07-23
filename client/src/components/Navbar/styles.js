import { styled } from "@mui/material/styles"
import { deepPurple } from "@mui/material/colors"

const PREFIX = "NavBar"
export const classes = {
    root: `${PREFIX}-root`,
    appBar: `${PREFIX}-appBar`,
    heading: `${PREFIX}-heading`,
    logo: `${PREFIX}-logo`,
    toolbar: `${PREFIX}-toolbar`,
    profile: `${PREFIX}-profile`,
    logout: `${PREFIX}-logout`,
    userName: `${PREFIX}-userName`,
    brandContainer: `${PREFIX}-brandContainer`,
    avatar: `${PREFIX}-avatar`,
    avaatar: `${PREFIX}-avaatar`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		paddingRight: '10px',
	},
	[`& .${classes.avaatar}`]: {
		margin: theme.spacing(1),
		height: '50px',
		width: '50px',
	},
	[`& .${classes.appBar}`]: {
		borderRadius: '5px',
		margin: '0 16px 0 6px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 50px',
		backgroundColor: 'rgba(255, 255, 255, .09)', //"transparent" //"rgba(69, 114, 200)"
		backdropFilter: 'blur(10px)',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
		[theme.breakpoints.down(360)]: {
			padding: '10px 30px',
		},
	},
	[`& .${classes.heading}`]: {
		[theme.breakpoints.down(400)]: {
			width: '-webkit-fill-available',
		},
	},
	[`& .${classes.logo}`]: {
		marginLeft: '10px',
		marginTop: '5px',

		[theme.breakpoints.down(400)]: {
			display: 'none',
		},
	},
	[`& .${classes.toolbar}`]: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: 400,
		[theme.breakpoints.down('md')]: {
			width: '-webkit-fill-available',
			justifyContent: 'center',
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
}))

export default Root
