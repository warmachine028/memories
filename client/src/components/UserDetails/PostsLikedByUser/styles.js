import { styled } from '@mui/material/styles'

const PREFIX = 'PostDetails'
export const classes = {
	root: `${PREFIX}-root`,
	loadingPaper: `${PREFIX}-loadingPaper`,
	container: `${PREFIX}-container`,
	noPostsLiked: `${PREFIX}-noPostsLiked`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		
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
}))

export default Root
