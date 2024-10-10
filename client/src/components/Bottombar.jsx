import { Add, Favorite, MessageSharp } from '@mui/icons-material'
import { Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useCallback, useState } from 'react'
import { CreatePostDialog } from '@/components'

const Bottombar = () => {
	const [open, setOpen] = useState(false)

	const handleClickOpen = useCallback(() => {
		setOpen(true)
	}, [])
	return (
		<>
			<CreatePostDialog open={open} setOpen={setOpen} />
			<BottomNavigation
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 2,
					display: {
						md: 'none',
						xs: 'flex'
					}
				}}
			>
				<BottomNavigationAction icon={<Favorite />} />
				<BottomNavigationAction
					onClick={handleClickOpen}
					disableRipple
					sx={{ position: 'relative' }}
					component="button"
					icon={
						<Avatar
							sx={{
								':hover': { transform: 'rotate(45deg)' },
								transition: 'transform 0.2s',
								width: 60,
								height: 60,
								position: 'absolute',
								bottom: '30%',
								bgcolor: 'primary.main'
							}}
						>
							<Add />
						</Avatar>
					}
				/>
				<BottomNavigationAction icon={<MessageSharp />} />
			</BottomNavigation>
		</>
	)
}

export default Bottombar
