import { Google, LockOutlined } from '@mui/icons-material'
import { Box, Button, ButtonGroup, Checkbox, FormGroup, Paper, TextField, Typography, Avatar } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {
	const [checked, setChecked] = useState(true)
	return (
		<Paper sx={{ padding: 2, width: '100vw', maxWidth: 400, margin: 'auto' }}>
			<form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 5 }}>
				<Avatar sx={{ bgcolor: { xs: 'secondary.main' } }}>
					<LockOutlined />
				</Avatar>
				<Typography variant="h5">WELCOME BACK</Typography>
				<Box width="100%" display="flex" flexDirection="column" gap="12px" marginBottom="9px">
					<FormGroup className="mb-3">
						<TextField id="email" label="Email" variant="outlined" name="email" type="email" autoComplete="email" required />
					</FormGroup>
					<FormGroup className="mb-3">
						<TextField id="password" label="Password" variant="outlined" name="password" type="password" autoComplete="password" required />
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
				<Button fullWidth to="/signup" LinkComponent={Link} sx={{ ':hover': { backgroundColor: 'transparent' } }} disableTouchRipple>
					<Typography variant="subtitle2" sx={{ fontWeight: { xs: '12px' } }}>
						Don&apos;t have an account? Sign Up
					</Typography>
				</Button>
				<Box display="flex" width="100%">
					<Box display="flex" justifyContent="flex-start" width="100%" textAlign="start">
						<Button
							sx={{
								':hover': {
									backgroundColor: 'transparent',
								},
								p: 0,
							}}
							onClick={() => setChecked(!checked)}
							disableTouchRipple
						>
							<Checkbox size="small" value={checked} />
							<Typography variant="subtitle2" sx={{ fontWeight: { xs: '12px' } }}>
								REMEMBER ME
							</Typography>
						</Button>
					</Box>

					<Box display="flex" justifyContent="flex-end" width="100%" textAlign="end">
						<Button LinkComponent={Link} to="/forgot-password">
							<Typography variant="subtitle2" sx={{ fontWeight: { sm: '1px' } }}>
								FORGOT PASSWORD
							</Typography>
						</Button>
					</Box>
				</Box>
			</form>
		</Paper>
	)
}

export default LogIn
