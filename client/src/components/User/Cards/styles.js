import { styled } from '@mui/material/styles'
import { CardMedia, Grow as MUIGrow } from '@mui/material'
const PREFIX = 'Cards'
export const classes = {
	root: `${PREFIX}-root`,
	loadingCard: `${PREFIX}-loadingCard`,
	loadingCardHeader: `${PREFIX}-loadingCardHeader`,
	postCard: `${PREFIX}-postCard`,
	buttonBase: `${PREFIX}-buttonBase`,
	cardMedia: `${PREFIX}-cardMedia`,
	cardContent: `${PREFIX}-cardContent`,
	overlay: `${PREFIX}-overlay`,
	cardActions: `${PREFIX}-cardActions`,
	commentContainer: `${PREFIX}-commentContainer`,
	commentBox: `${PREFIX}-commentBox`,
	commentItem: `${PREFIX}-commentItem`,
	userName: `${PREFIX}-userName`,
	comment: `${PREFIX}-comment`,
	time: `${PREFIX}-time`,
}

export const Root = styled('div')(({ theme }) => ({
	[`& .${classes.loadingCard}`]: {
		maxWidth: 345,
		margin: 16,
		width: 300,
		backgroundColor: 'transparent',
	},
	[`& .${classes.loadingCardHeader}`]: {
		marginBottom: 6,
		height: 10,
		width: '80%',
	},
	[`& .${classes.postCard}`]: {
		width: 300,
		maxWidth: 300,
		margin: 16,
		backgroundColor: 'transparent',
		backdropFilter: 'blur(10px)',
	},
	[`& .${classes.buttonBase}`]: {
		width: '100%',
		padding: '0',
		display: 'inline-flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
	},
	[`& .${classes.cardMedia}`]: {
		height: 200,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		backgroundBlendMode: 'darken',
		filter: 'brightness(.8)',
	},
	[`& .${classes.cardContent}`]: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: 270,
	},
	[`& .${classes.overlay}`]: {
		position: 'absolute',
		top: 20,
		left: 20,
		'& .MuiTypography-root': {
			color: 'white',
		},
	},
	[`& .${classes.cardActions}`]: {
		padding: '0 16px 8px 16px',
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		position: 'absolute',
		bottom: 10,
		left: 10,
	},
}))

export const Media = styled(CardMedia)(({theme}) => ({
	borderRadius: 5,
	height: 90,
	width: 130,
	[theme.breakpoints.down('sm')]: {
		height: '67px',
		width: '100px'
	}
}))

export const Comment = styled(MUIGrow)(() => ({
	width: '100%',
	[`& .${classes.commentContainer}`]: {
		display: 'flex',
		textDecoration: 'none',
	},
	[`& .${classes.commentBox}`]: {
		width: '100%',
		margin: 5,
		height: 'fit-content',
		borderRadius: 5,
		backgroundColor: 'rgba(255, 255, 255, .09)',
		display: 'flex',
		alignItems: 'center',
		padding: 5,
	},
	[`& .${classes.commentItem}`]: {
		flexDirection: 'column',
		width: '100%',
		padding: 10,
	},
	[`& .${classes.userName}`]: {
		fontWeight: 600,
		color: 'black',
	},
	[`& .${classes.comment}`]: {
		fontSize: 'small',
		wordBreak: 'break-word',
		whiteSpace: 'pre-wrap',
		color: 'white',
	},
	[`& .${classes.time}`]: {
		textAlign: 'start',
		fontSize: 'small',
		color: 'rgba(255, 255, 255, .30)',
	},
}))