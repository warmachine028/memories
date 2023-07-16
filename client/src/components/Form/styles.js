import { styled } from '@mui/material/styles'

const PREFIX = 'Form'

export const classes = {
	root: `${PREFIX}-root`,
	paperLight: `${PREFIX}-paperLight`,
	paperDark: `${PREFIX}-paperDark`,
	form: `${PREFIX}-form`,
	buttonSubmit: `${PREFIX}-buttonSubmit`,
	chip: `${PREFIX}-chip`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		'& .MuiTextField-root': {
			margin: theme.spacing(0.5, 0)
		},
		'& .MuiOutlinedInput-root': {
			color: 'white',
		},
		'& .MuiFormLabel-root': {
			color: 'white',
		},
		'& .MuiChip-filled': {
			background: '#ffffff70',
		},
	},
	[`& .${classes.paperLight}`]: {
		padding: theme.spacing(2),
		backgroundColor: 'rgba(255, 255, 255, .09)',
		backdropFilter: 'blur(10px)',
		borderRadius: '5px',
	},

	[`& .${classes.paperDark}`]: {
		backgroundColor: 'rgba(5, 5, 5, .90)',
		color: 'white',
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#b3b3b3',
			},
			'&.Mui-focused fieldset': {
				borderColor: theme.palette.primary.main,
			},
		},
		[`& .${classes.buttonSubmit}`]: {
			'&.Mui-disabled': {
				backgroundColor: '#aebfd1'
			},
		},
	},
	[`& .${classes.form}`]: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	[`& .${classes.buttonSubmit}`]: {
		marginTop: 10,
	},
	[`& .${classes.chip}`]: {
		margin: '5px 0',
	},
}))

export default Root
