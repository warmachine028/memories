import { Add, Home, Tag } from '@mui/icons-material'
import { Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useState } from 'react'
import { CreatePostDialog } from '@/components'
import { useNavigate } from 'react-router'

const Bottombar = () => {
	const [open, setOpen] = useState(false)
	const handleClickOpen = () => setOpen(true)
	const navigate = useNavigate()
	return (
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
			<BottomNavigationAction
				icon={<Home />}
				onClick={() => navigate('/')}
			/>
			<BottomNavigationAction
				onClick={handleClickOpen}
				disableRipple
				component="button"
				icon={
					<Avatar
						sx={{
							':hover': { transform: 'rotate(45deg)' },
							transform: open && 'rotate(45deg)',
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
			<BottomNavigationAction
				icon={<Tag />}
				onClick={() => navigate('/trending')}
			/>
			<CreatePostDialog open={open} setOpen={setOpen} />
		</BottomNavigation>
	)
}

export default Bottombar
