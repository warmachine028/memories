import { styled } from '@mui/material/styles'

const PREFIX = 'UserIcon'

export const classes = {
	root: `${PREFIX}-root`,
	avatar: `${PREFIX}-avatar`,
}

export const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        display: "contents"
    },
	[`& .${classes.avatar}`]: {
		margin: theme.spacing(1),
        height: "200px",
        width: "200px",
        borderRadius: "200px"
	},
}))

export default Root
