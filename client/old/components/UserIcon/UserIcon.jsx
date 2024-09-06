import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Root, classes } from './styles'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import Avatar from 'avataaars2'
import { RandomAvatar } from './avatar'

export const UserIcon = ({ formData, setFormData }) => {
	const [avatar, setAvatar] = useState(RandomAvatar())

	const shuffle = () => setAvatar(RandomAvatar())
	useEffect(() => {
		setAvatar(avatar)
		setFormData({ ...formData, avatar: avatar })
	}, [avatar])

	return (
		<Root className={classes.root}>
			<Avatar className={classes.avatar} avatarStyle="Circle" {...avatar} />
			<Button name="avatar" onClick={shuffle} variant="outlined" size="small" startIcon={<ShuffleIcon />}>
				Random
			</Button>
		</Root>
	)
}

export default UserIcon
