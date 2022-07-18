import { styled } from '@mui/material/styles'

const PREFIX = 'TabPage'
export const classes = {
	root: `${PREFIX}-root`,
	loadingPaper: `${PREFIX}-loadingPaper`,
	container: `${PREFIX}-container`,
	noPostsLiked: `${PREFIX}-noPostsLiked`,
	tab: `${PREFIX}-tab`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {},
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
