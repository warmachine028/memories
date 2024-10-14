import { Avatar, IconButton, Tooltip } from '@mui/material'

const UserAvatar = ({ handleClick, user, tooltipText, disableHover, size }) => {
	return (
		<Tooltip title={tooltipText} arrow>
			<IconButton onClick={handleClick} sx={{ p: 0 }}>
				<Avatar sx={{ ':hover': disableHover ? {} : { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 3 }, width: size, height: size }} src={user.imageUrl}>
					{user.fullName.charAt(0)}
				</Avatar>
			</IconButton>
		</Tooltip>
	)
}

export default UserAvatar
