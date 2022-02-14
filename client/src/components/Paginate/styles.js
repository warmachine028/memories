import { styled } from '@mui/material/styles'

const PREFIX = 'Paginate'
export const classes = {
	root: `${PREFIX}-root`,
	ul: `${PREFIX}-ul`,
	pagination: `${PREFIX}-pagination`,
	paper: `${PREFIX}-paper`,
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
	[`& .${classes.paper}`]: {
		borderRadius: 4,
		marginTop: '1rem',
		padding: '16px',
		backgroundColor: 'rgba(255, 255, 255, .09)',
		backdropFilter: 'blur(10px)',
	},
})

export default Root
