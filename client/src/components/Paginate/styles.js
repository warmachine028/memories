import { styled } from '@mui/material/styles'

const PREFIX = 'Paginate'

export const classes = {
	root: `${PREFIX}-root`,
	ul: `${PREFIX}-ul`,
	pagination: `${PREFIX}-pagination`,
	paperLight: `${PREFIX}-paperLight`,
	paperDark: `${PREFIX}-paperDark`,
	eachPage: `${PREFIX}-eachPage`,
}

export const Root = styled('div')({
	[`& .${classes.root}`]: {
		'& .Mui-disabled': {
			color: 'white',
		},
		'&. MuiButtonBase-root-MuiPaginationItem-root': {
			border: '1px solid white',
			color: 'white',
		},
	},
	[`& .${classes.ul}`]: {
		justifyContent: 'space-around',
        color: 'white',
        opacity: 1,
		'& .Mui-disabled ': {
			color: 'white',
			opacity: 0.5,
		},
	},
	[`& .${classes.paperLight}`]: {
		borderRadius: 4,
		marginTop: '1rem',
		padding: '16px',
		backgroundColor: 'rgba(255, 255, 255, .09)',
		backdropFilter: 'blur(10px)',
	},
	[`& .${classes.paperDark}`]: {
		borderRadius: 4,
		marginTop: '1rem',
		padding: '16px',
		backgroundColor: 'rgba(5, 5, 5, .90)',
		backdropFilter: 'blur(10px)',
	},
	[`& .${classes.eachPage}`]: {
		color: 'white',
		border: '1px solid white',
	},
})

export default Root
