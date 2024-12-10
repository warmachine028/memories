import { Avatar, IconButton, Tooltip } from '@mui/material'

const UserAvatar = ({
	onClick: handleClick,
	user,
	tooltipText,
	disableHover,
	size
}) => {
	return (
		<Tooltip title={tooltipText} arrow>
			<IconButton onClick={handleClick} sx={{ p: 0 }}>
				<Avatar
					sx={{
						transition: 'transform 0.2s, z-index 0.2s',
						':hover': disableHover
							? {}
							: {
									outline: '2px solid',
									outlineColor: 'primary.main',
									outlineOffset: 3
								},
						width: size,
						height: size
					}}
					src={user.imageUrl}
				>
					{user.fullName.charAt(0)}
				</Avatar>
			</IconButton>
		</Tooltip>
	)
}

export default UserAvatar
