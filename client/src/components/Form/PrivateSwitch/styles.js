import { styled } from '@mui/material/styles'

const PREFIX = 'privateSwitch'

export const classes = {
	root: `${PREFIX}-root`,
	i: `${PREFIX}-i`,
	formSwitch: `${PREFIX}-formSwitch`,
	input: `${PREFIX}-input`,
}

export const Root = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		width: '-webkit-fill-available',
		display: 'flex',
		alignItems: 'center',
		marginBottom: '3px',
	},
	[`& .${classes.formSwitch}`]: {
		display: 'flex',
		cursor: 'pointer',
		alignItems: 'center',
		':active i::after': {
			width: '28px',
			transform: 'translate3d(2px, 2px, 0)',
		},
		':active input:checked + i::after': {
			transform: 'translate3d(16px, 2px, 0)',
		},
	},

	[`& .${classes.input}`]: {
		display: 'none',
		':checked + i': {
			backgroundColor: '#1976d28c',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="40" viewBox="19 3 13 19"><path fill="${encodeURIComponent(theme.palette.getContrastText(theme.palette.primary.main))}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
		},
		':checked + i::before': {
			transform: 'translate3d(-3px, 2px, 0) scale3d(0, 0, 0)',
		},
		':checked + i::after': {
			transform: 'translate3d(23px, 2px, 0)',
		},
	},

	[`& .${classes.i}`]: {
		position: 'relative',
		display: 'inline-block',
		marginRight: '.5rem',
		width: '52px',
		height: '25px',
		backgroundRepeat: 'no-repeat',
		backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="42" viewBox="-13 -3 13 19"><path fill="black" d="M19,13H5V11H19V13Z" /></svg>')`,
		borderRadius: '25px',
		verticalAlign: 'text-bottom',
		transition: 'all 0.3s',
		'::before': {
			content: '""',
			position: 'absolute',
			left: '-2px',
			top: '-3px',
			borderStyle: 'solid',
			borderWidth: '1px',
			width: '52px',
			height: '25px',
			borderRadius: '25px',
			transform: 'translate3d(2px, 2px, 0) scale3d(1, 1, 1)',
			transition: 'all 0.3s',
		},
		'::after': {
			content: '""',
			position: 'absolute',
			left: '6px',
			top: '0.25px',
			width: '20px',
			height: '20px',
			backgroundColor: 'black',
			borderRadius: '25px',
			boxShadow: '0 2px 2px rgba(0, 0, 0, 0.24)',
			transform: 'translate3d(-3px, 2px, 0)',
			transition: 'all 0.2s ease-in-out',
		},
	},
}))
