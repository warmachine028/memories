import { styled } from '@mui/material/styles'

const PREFIX = 'Post'
export const classes = {
	root: `${PREFIX}-root`,
	media: `${PREFIX}-media`,
	border: `${PREFIX}-border`,
	fullHeightCard: `${PREFIX}-fullHeightCard`,
	cardLight: `${PREFIX}-cardLight`,
	cardDark: `${PREFIX}-cardDark`,
	overlay: `${PREFIX}-overlay`,
	overlay2: `${PREFIX}-overlay2`,
	grid: `${PREFIX}-grid`,
	tags: `${PREFIX}-tags`,
	details: `${PREFIX}-details`,
	title: `${PREFIX}-title`,
	cardAction: `${PREFIX}-cardAction`,
	cardActions: `${PREFIX}-cardActions`,
	privateLabel: `${PREFIX}-privateLabel`,
	avatar: `${PREFIX}-avatar`,
	avaatar: `${PREFIX}-avaatar`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		height: '100%',
	},
	[`& .${classes.avaatar}`]: {
		height: 50,
		width: 50,
	},
	[`& .${classes.avatar}`]: {
		height: 46,
		width: 46,
	},
	[`& .${classes.media}`]: {
		paddingTop: '56.25%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		backgroundBlendMode: 'darken',
		transition: 'transform .2s',
	},
	[`& .${classes.cardLight}`]: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		borderRadius: 5,
		height: '100%',
		position: 'relative',
		backgroundColor: 'rgba(255, 255, 255, .09)',
		backdropFilter: 'blur(10px)',
		transition: 'transform .2s',
		'&:hover': {
			transform: 'scale(1.05)',
		},
	},
	[`& .${classes.cardDark}`]: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		borderRadius: 5,
		height: '100%',
		position: 'relative',
		backgroundColor: 'rgba(5, 5, 5, .90)', //"transparent" //"rgba(69, 114, 200)"
		backdropFilter: 'blur(10px)',
		transition: 'transform .2s',
		'&:hover': {
			transform: 'scale(1.05)',
		},
	},
	[`& .${classes.overlay}`]: {
		position: 'absolute',
		top: 20,
		left: 20,
	},
	[`& .${classes.overlay2}`]: {
		position: 'absolute',
		top: 20,
		right: 20,
	},
	[`& .${classes.grid}`]: {
		display: 'flex',
	},
	[`& .${classes.tags}`]: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: 20,
	},
	[`& .${classes.details}`]: {
		display: 'flex',
		flexDirection: 'column',
	},
	[`& .${classes.title}`]: {
		padding: '0 16px',
		color: 'white',
	},
	[`& .${classes.cardActions}`]: {
		padding: '0 16px 8px 16px',
		display: 'flex',
		justifyContent: 'space-between',
	},
	[`& .${classes.cardAction}`]: {
		display: 'block',
		textAlign: 'initial',
	},
	[`& .${classes.privateLabel}`]: {
		backgroundColor: '#00b5ff',
		align: 'center',
	},
}))

export default Root
