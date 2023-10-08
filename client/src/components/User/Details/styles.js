import { styled } from '@mui/material/styles'

const PREFIX = 'UserDetails'
export const classes = {
	root: `${PREFIX}-root`,
	userContainer: `${PREFIX}-userContainer`,
	userIcon: `${PREFIX}-userIcon`,
	avatar: `${PREFIX}-avatar`,
	userDetails: `${PREFIX}-userDetails`,
	loadingLine: `${PREFIX}-loadingLine`,
	tagsContainer: `${PREFIX}-tagsContainer`,
	loadingPaper: `${PREFIX}-loadingPaper`,
	chips: `${PREFIX}-chips`,
	newUser: `${PREFIX}-newUser`,
	appBarDark: `${PREFIX}-appBarDark`,
	appBarLight: `${PREFIX}-appBarLight`,
	labeltxtColor: `${PREFIX}-labeltxtColor`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		margin: '10px 5px',
	},
	[`& .${classes.userContainer}`]: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 10,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
			padding: 20,
			margin: 0,
			paddingBottom: 10,
		},
	},
	[`& .${classes.userIcon}`]: {
		display: 'flex',
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		borderRadius: '5px',
		minheight: '39vh',
		backgroundColor: 'rgba(255, 255, 255, .09)',
		backdropFilter: 'blur(10px)',
		flexDirection: 'column',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
			marginRight: 0,
			width: '100%',
		},
	},
	[`& .${classes.avatar}`]: {
		margin: theme.spacing(1),
		height: '200px',
		width: '200px',
	},
	[`& .${classes.userDetails}`]: {
		display: 'flex',
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: '20px',
		borderRadius: '5px',
		minheight: '39vh',
		backgroundColor: 'rgba(255, 255, 255, .09)',
		backdropFilter: 'blur(10px)',
		flexDirection: 'row',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column-reverse',
			alignItems: 'start',
			marginTop: 10,
		},
		[theme.breakpoints.down('md')]: {
			justifyContent: 'space-between',
		},
	},
	[`& .${classes.loadingLine}`]: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '50%',
		[theme.breakpoints.down('md')]: {
			width: '100%',
		},
	},
	[`& .${classes.tagsContainer}`]: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 3,
	},
	[`& .${classes.loadingPaper}`]: {
		display: 'flex',
		justifyContent: 'center',
		padding: 20,
		borderRadius: 5,
		minheight: '39vh',
		marginBottom: 10,
		backgroundColor: 'rgba(255, 255, 255, .09)',
		backdropFilter: 'blur(10px)',
		flexDirection: 'column',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	[`& .${classes.chips}`]: {
		background: '#ffffff70',
		margin: 2,
	},
	[`& .${classes.newUser}`]: {
		margin: 'auto',
		color: 'white',
	},
	[`& .${classes.appBarDark}`]: {
		backgroundColor: 'rgba(5, 5, 5, .90)',
	},
	[`& .${classes.appBarLight}`]: {
		color: 'black',
	},
	[`& .${classes.labeltxtColor}`]: {
		color: 'white',
	},
}))

export default Root