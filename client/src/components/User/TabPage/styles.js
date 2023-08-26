import { styled } from '@mui/material/styles'

const PREFIX = 'TabPage'
export const classes = {
	root: `${PREFIX}-root`,
	loadingPaper: `${PREFIX}-loadingPaper`,
	container: `${PREFIX}-container`,
	noPostsLiked: `${PREFIX}-noPostsLiked`,
	tab: `${PREFIX}-tab`,
	commentContainer: `${PREFIX}-commentContainer`,
	commentBox: `${PREFIX}-commentBox`,
	commentItem: `${PREFIX}-commentItem`,
	userName: `${PREFIX}-userName`,
	comment: `${PREFIX}-comment`,
	time: `${PREFIX}-time`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {},
	[`& .${classes.commentContainer}`]: {
		width: '100%',
		display: 'flex',
		textDecoration: 'none',
	},
	[`& .${classes.tab}`]: {
		display: 'flex',
		justifyContent: 'center',
		minheight: '39vh',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
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
	[`& .${classes.container}`]: {
		justifyContent: 'space-around',
		marginTop: 10,
		marginLeft: 0,
		flexDirection: 'row',
		width: '100%',
	},
	[`& .${classes.noPostsLiked}`]: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: 'white',
	},
	[`& .${classes.userName}`]: {
		fontWeight: 600,
		color: 'black',
	},
	[`& .${classes.comment}`]: {
		textAlign: 'justify',
		fontSize: 'small',
		wordBreak: 'break-word',
		color: 'white',
	},
	[`& .${classes.time}`]: {
		textAlign: 'start',
		fontSize: 'small',
		color: 'rgba(255, 255, 255, .30)',
	},

}))

export default Root
