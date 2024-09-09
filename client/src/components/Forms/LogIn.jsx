import { Google, LockOutlined } from '@mui/icons-material'
import { Box, Button, ButtonGroup, Checkbox, FormGroup, Paper, TextField, Typography, Avatar, FormControlLabel } from '@mui/material'
import SwitchBase from '@mui/material/internal/SwitchBase'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {
	const handleSubmit = useCallback((event) => {
		event.preventDefault()
		console.log('Submitted')
	}, [])

	return (
		<Paper sx={{ padding: 2, width: '100vw', maxWidth: 400, margin: 'auto' }}>
			<Box component={'form'} onSubmit={handleSubmit} alignItems="center" display="flex" flexDirection="column" gap={1}>
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
				<FormComponents />
			</Box>
		</Paper>
	)
}
const FormComponents = () => {
	const [checked, setChecked] = useState(false)

	return (
		<Box display="flex" width="100%">
			<Box display="flex" justifyContent="flex-start" width="100%" textAlign="start">
				<FormControlLabel
					defaultChecked={checked}
					control={<Checkbox />}
					label={
						<Typography fontWeight={{ xs: '12px' }} variant="subtitle2" color="primary">
							REMEMBER ME
						</Typography>
					}
					value={checked}
					onClick={setChecked}
				/>
			</Box>

			<Box display="flex" justifyContent="flex-end" width="100%" textAlign="end">
				<Typography component={Link} to="/forgot-password" variant="subtitle2" sx={{ fontWeight: { sm: '1px' }, textDecoration: 'none', color: 'primary.main', display: 'flex', alignItems: 'center' }}>
					FORGOT PASSWORD
				</Typography>
			</Box>
		</Box>
	)
}
export default LogIn
