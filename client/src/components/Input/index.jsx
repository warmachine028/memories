import { TextField, Grid, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Input = ({ name, half, type, handleShowPassword, ...props }) => {
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				name={name}
				variant="outlined"
				required
				fullWidth
				type={type}
				{...props}
				autoComplete={name === 'password' ? 'current-password' : 'off'}
				InputProps={
					(name === 'password'
						? {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={handleShowPassword}>{type === 'password' ? <Visibility /> : <VisibilityOff />}</IconButton>
									</InputAdornment>
								),
						  }
						: null,
					{ style: { color: 'white' } })
				}
			/>
		</Grid>
	)
}

export default Input
