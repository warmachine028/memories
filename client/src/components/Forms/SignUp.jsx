import { Google, LockOutlined } from '@mui/icons-material'
import { Box, Button, ButtonGroup, FormGroup, Paper, TextField, Typography, Avatar, Grid2 as Grid } from '@mui/material'
import { Link } from 'react-router-dom'

const SignUp = () => {
	return (
		<Paper sx={{ padding: 2, width: 350, margin: 'auto' }}>
			<form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 5 }}>
				<Avatar>
					<LockOutlined />
				</Avatar>
				<Typography variant="h5">JOIN US NOW</Typography>
				<Box width="100%" display="flex" flexDirection="column" gap="12px" marginBottom="9px">
					<Grid container size={{ xs: 12, md: 12, xl: 3 }} spacing={1.5}>
						<Grid size={{ xs: 12, sm: 12, md: 6 }}>
							<FormGroup className="mb-3">
								<TextField id="first-name" label="First Name" variant="outlined" name="firstName" type="text" autoComplete="given-name" required half />
							</FormGroup>
						</Grid>
						<Grid size={{ xs: 12, sm: 12, md: 6 }}>
							<FormGroup className="mb-3">
								<TextField id="last-name" label="Last Name" variant="outlined" name="email" type="text" autoComplete="family-name" required half />
							</FormGroup>
						</Grid>
					</Grid>
					<FormGroup className="mb-3">
						<TextField id="email" label="Email" variant="outlined" name="email" type="email" autoComplete="email" required />
					</FormGroup>
					<FormGroup className="mb-3">
						<TextField id="password" label="Password" variant="outlined" name="password" type="password" autoComplete="password" required />
					</FormGroup>
					<FormGroup className="mb-3">
						<TextField id="repeat-password" label="Repeat Password" variant="outlined" name="repeat-password" type="password" autoComplete="off" required />
					</FormGroup>
				</Box>
				<ButtonGroup fullWidth orientation="vertical" aria-label="Vertical button group">
					<Button variant="contained" type="submit">
						CREATE ACCOUNT
					</Button>
					<Button variant="contained" color="secondary" startIcon={<Google />}>
						Log In with Google
					</Button>
				</ButtonGroup>
				<Button fullWidth to="/login" LinkComponent={Link} sx={{ ':hover': { backgroundColor: 'transparent' } }}>
					<Typography variant="subtitle2" sx={{ fontWeight: { xs: '12px' } }}>
						Already have an account? Log In
					</Typography>
				</Button>
			</form>
		</Paper>
	)
}

export default SignUp
