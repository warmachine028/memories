import { Archive, Favorite, Restore } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Icon, Paper } from '@mui/material'

const BottomBar = () => {
	return (
		<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
			<BottomNavigation
				showLabels
				value={1}
				onChange={(event, newValue) => {
					setValue(newValue)
				}}
			>
                <BottomNavigationAction label="Recents" icon={
                    
                    <Restore />} />
				<BottomNavigationAction label="Favorites" icon={<Favorite />} />
				<BottomNavigationAction label="Archive" icon={<Archive />} />
			</BottomNavigation>
		</Paper>
	)
}

export default BottomBar
