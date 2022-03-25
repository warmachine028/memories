import { styled } from '@mui/material/styles'

const PREFIX = 'FileInput'

export const classes = {
	root: `${PREFIX}-root`,
	fileInput: `${PREFIX}-fileInput`,
	inputButton: `${PREFIX}-fileInputButton`,
	fileName: `${PREFIX}-fileName`,
	media: `${PREFIX}-media`,
}

export const Root = styled('div')({
	[`&.${classes.root}`]: {
		width: '-webkit-fill-available',
		margin: '4px 0',
	},
	[`& .${classes.fileName}`]: {
		position: 'relative',
		width: '-webkit-fill-available',
		p: {
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			paddingRight: '0px',
			textOverflow: 'ellipsis',
			position: 'absolute',
			width: 'inherit',
			bottom: '-22px',
		},
	},
	[`& .${classes.fileInput}`]: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		color: 'white',
		justifyContent: 'flex-start',
	},
	[`& .${classes.inputButton}`]: {
		background: '#ffffff63',
		color: 'white',
		margin: '0 10px 0px 0',
		paddingBottom: '1px',
		align: 'center',
		width: 'max-content',
	},
	[`& .${classes.media}`]: {
		marginTop: '5px',
		borderRadius: '5px',
		objectFit: 'cover',
		width: '100%',
		maxHeight: '239px',
		aspectRatio: '1.77',
		position: 'block'
	},
})
