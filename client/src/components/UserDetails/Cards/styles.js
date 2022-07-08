import { styled } from '@mui/material/styles'

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
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		// margin: '10px 5px',
	},
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
		maxWidth: 300,
		margin: 16,
		backgroundColor: 'rgba(255, 255, 255, .09)',
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