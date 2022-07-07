import { styled } from '@mui/material/styles'

const PREFIX = 'PostDetails'
export const classes = {
	root: `${PREFIX}-root`,
	media: `${PREFIX}-media`,
	card: `${PREFIX}-card`,
	section: `${PREFIX}-section`,
	imageSection: `${PREFIX}-imageSection`,
	recommendedPosts: `${PREFIX}-recommendedPosts`,
	loadingPaper: `${PREFIX}-loadingPaper`,
	commentsOuterContainer: `${PREFIX}-commentsOuterContainer`,
	commentsInnerContainer: `${PREFIX}-commentsInnerContainer`,
	comment: `${PREFIX}-comment`,
	commentText: `${PREFIX}-commentText`,
	paragraph: `${PREFIX}-paragraph`,
	tags: `${PREFIX}-tags`,
	title: `${PREFIX}-title`,
	privateLabel: `${PREFIX}-privateLabel`,
	avatar: `${PREFIX}-avatar`,
	userContainer: `${PREFIX}-userContainer`,
	userIcon: `${PREFIX}-userIcon`,
	userDetails: `${PREFIX}-userDetails`,
	container: `${PREFIX}-container`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		margin: '10px 5px',
	},
	[`& .${classes.container}`]: {
		justifyContent: 'space-around',
		marginTop: 10,
		marginLeft: 0,
		flexDirection: 'row',
	},

	[`& .${classes.media}`]: {
		borderRadius: '5px',
		objectFit: 'scale-down',
		width: '100%',
		maxHeight: '500px',
	},
	[`& .${classes.card}`]: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		[theme.breakpoints.down('sm')]: {
			flexWrap: 'wrap',
		},
	},
	[`& .${classes.section}`]: {
		borderRadius: '5px',
		margin: '10px',
		flex: 1,
		[theme.breakpoints.down('md')]: {
			flexWrap: 'wrap',
		},
	},
	[`& .${classes.imageSection}`]: {
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	[`& .${classes.avatar}`]: {
		margin: theme.spacing(1),
		height: '200px',
		width: '200px',
		borderRadius: '200px',
	},
	[`& .${classes.recommendedPosts}`]: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},

	[`& .${classes.userContainer}`]: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		justifyContent: 'space-between',
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
		alignItems: 'flex-start',
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
	[`& .${classes.userDetails}`]: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: '20px',
		borderRadius: '5px',
		minheight: '39vh',
		backgroundColor: 'rgba(255, 255, 255, .09)',
		backdropFilter: 'blur(10px)',
		flexDirection: 'column',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			// width:"max-content"
			marginTop: 10,
		},
	},
	[`& .${classes.loadingPaper}`]: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: 20,
		borderRadius: 5,
		minheight: '39vh',
		marginBottom: 10,
		backgroundColor: 'rgba(255, 255, 255, .09)',
		backdropFilter: 'blur(10px)',
		flexDirection: 'column',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	[`& .${classes.commentsOuterContainer}`]: {
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	[`& .${classes.commentsInnerContainer}`]: {
		height: '200px',
		overflowY: 'auto',
		marginRight: '0px',
		width: '-webkit-fill-available',
		[theme.breakpoints.down('sm')]: {
			display: 'grid',
			justifyItems: 'center',
		},
	},
	[`& .${classes.comment}`]: {
		width: '100%',
		display: 'flex',
	},
	[`& .${classes.commentText}`]: {
		width: '94%',
		display: 'flex',
		color: 'white',
		overflowWrap: 'break-word',
		wordWrap: 'break-word',
		hyphens: 'auto',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '280px',
		},
		[theme.breakpoints.down(385)]: {
			maxWidth: '225px',
		},
	},
	[`& .${classes.paragraph}`]: {
		textAlign: 'justify',
		color: 'white',
	},
	[`& .${classes.tags}`]: {
		textAlign: 'center',
	},
	[`& .${classes.title}`]: {
		textAlign: 'center',
	},
	[`& .${classes.privateLabel}`]: {
		backgroundColor: '#00b5ff',
		align: 'center',
	},
}))

export default Root
