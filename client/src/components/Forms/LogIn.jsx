import { Google, LockOutlined } from '@mui/icons-material'
import { Box, Button, ButtonGroup, Checkbox, FormGroup, Icon, Paper, TextField, Typography, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'

const LogIn = () => {
	return (
		<Paper sx={{ padding: 2, width: 350, margin: 'auto' }}>
			<form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 5 }}>
				<Avatar>
					<LockOutlined />
				</Avatar>
				<Typography variant="h5">WELCOME BACK</Typography>
				<Box width="100%" display="flex" flexDirection="column" gap="12px" marginBottom="9px">
					<FormGroup className="mb-3">
						<TextField id="email" label="Email" variant="outlined" name="email" type="email" autoComplete="email" />
					</FormGroup>
					<FormGroup className="mb-3">
						<TextField id="password" label="Password" variant="outlined" name="password" type="password" autoComplete="password" />
					</FormGroup>
				</Box>
				<ButtonGroup fullWidth orientation="vertical" aria-label="Vertical button group">
					<Button variant="contained" type="submit">
						Log In Now
					</Button>
					<Button variant="contained" color="secondary" startIcon={<Google />}>
						Log In with Google
					</Button>
				</ButtonGroup>
				<Button fullWidth to="/signup" LinkComponent={Link}>
					Don't have an account? Sign Up
				</Button>
				<Box width="100%" display="flex" justifyContent="space-between">
					<Button
						disableRipple
						sx={{
							'&:hover': {
								backgroundColor: 'rgba(0, 0, 0, .1)',
							},
						}}
					>
						<Checkbox />
						REMEMBER ME
					</Button>
					<Button LinkComponent={Link} to="/forgot-password" disableRipple>
						FORGOT PASSWORD
					</Button>
				</Box>
			</form>
		</Paper>
	)
}

export default LogIn
