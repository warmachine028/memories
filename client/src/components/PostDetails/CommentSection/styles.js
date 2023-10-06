import { styled } from '@mui/material/styles'

const PREFIX = 'CommentSection'
export const classes = {
	root: `${PREFIX}-root`,
	outerContainer: `${PREFIX}-outerContainer`,
	innerContainer: `${PREFIX}-innerContainer`,
	commentContainer: `${PREFIX}-commentContainer`,
	commentBox: `${PREFIX}-commentBox`,
	commentItem: `${PREFIX}-commentItem`,
	userName: `${PREFIX}-userName`,
	comment: `${PREFIX}-comment`,
	time: `${PREFIX}-time`,
	avatar: `${PREFIX}-avatar`,
	avaatar: `${PREFIX}-avaatar`,
	textColor: `${PREFIX}-textColor`,
	darkTextColor: `${PREFIX}-darkTextColor`,
	commentContainerBox: `${PREFIX}-commentContainerBox`,
	darkCommentContainerBox: `${PREFIX}-darkCommentContainerBox`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		margin: '10px 5px',
	},
	[`& .${classes.avaatar}`]: {
		height: 55,
		width: 55,
	},
	[`& .${classes.avatar}`]: {
		margin: theme.spacing(1),
		height: 46,
		width: 46,
	},
	[`& .${classes.outerContainer}`]: {
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	[`& .${classes.innerContainer}`]: {
		height: 300,
		overflowY: 'auto',
		marginRight: '0px',
		width: '100%',
		display: 'block',
		[theme.breakpoints.down('sm')]: {
			display: 'grid',
			justifyItems: 'center',
		},
	},
	[`& .${classes.commentContainer}`]: {
		width: '100%',
		display: 'flex',
	},
	[`& .${classes.commentBox}`]: {
		width: '100%',
		margin: 5,
		height: 'fit-content',
		borderRadius: 5,
		backgroundColor: 'rgba(255, 255, 255, .09)',
		display: 'flex',
		alignItems: 'center',
		paddingLeft: 5,
	},
	[`& .${classes.commentItem}`]: {
		flexDirection: 'column',
		width: '100%',
		padding: 10,
	},
	[`& .${classes.userName}`]: {
		fontWeight: 600,
		color: 'white',
	},
	[`& .${classes.comment}`]: {
		textAlign: 'justify',
		fontSize: 'small',
		marginLeft: 10,
		wordBreak: 'break-word',
		whiteSpace: 'pre-wrap',
		color: 'white',
	},
	[`& .${classes.time}`]: {
		textAlign: 'start',
		fontSize: 'small',
		color: 'rgba(255, 255, 255, .30)',
	},
	[`& .${classes.textColor}`]: {
		color: 'black',
	},
	[`& .${classes.darkTextColor}`]: {
		color: 'white',
	},
	[`& .${classes.commentContainerBox}`]: {
		backgroundColor: 'transparent',
		textarea : {
			color: 'white'
		}
	},
	[`& .${classes.darkCommentContainerBox}`]: {
		backgroundColor: 'rgba(255,255,255, 0.30)',
		textarea : {
			color: 'white'
		}
	},
}))
