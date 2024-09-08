import { Add } from '@mui/icons-material'
import { Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material'

const Bottombar = () => {
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
        sx={{ position: 'relative', cursor: 'unset' }}
        disableRipple
        icon={
          <Avatar sx={{ width: 60, height: 60, position: 'absolute', bottom: '30%', bgcolor: 'primary.main' }}>
            <Add />
          </Avatar>
				}
      />
    </BottomNavigation>
  )
}

export default Bottombar
