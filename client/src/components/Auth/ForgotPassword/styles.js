import { styled } from '@mui/material/styles'

const PREFIX = 'ForgotPassword'
export const classes = {
	root: `${PREFIX}-root`,
	paper: `${PREFIX}-paper`,
	avatar: `${PREFIX}-avtar`,
	form: `${PREFIX}-form`,
	submit: `${PREFIX}-submit`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		'& .MuiFormLabel-root': {
			color: 'white',
		},
	},
	[`& .${classes.paper}`]: {
		marginBottom: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(2),
		transition: '0.2s',
		backgroundColor: 'rgba(255, 255, 255, .09)',
		backdropFilter: 'blur(10px)',
		borderRadius: '5px',
	},
	[`& .${classes.avatar}`]: {
		margin: theme.spacing(1),
		backgroundColor: '#4caf50',
	},
	[`& .${classes.form}`]: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	[`& .${classes.submit}`]: {
		margin: theme.spacing(1, 0, 1, 0),
	},
}))

export default Root
