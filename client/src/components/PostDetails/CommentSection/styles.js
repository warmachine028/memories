import { styled } from '@mui/material/styles'

const PREFIX = 'CommentSection'
export const classes = {
	root: `${PREFIX}-root`,
	outerContainer: `${PREFIX}-outerContainer`,
	innerContainer: `${PREFIX}-innerContainer`,
	commentContainer: `${PREFIX}-commentContainer`,
	commentBox: `${PREFIX}-commentBox`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		margin: '10px 5px',
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
}))
