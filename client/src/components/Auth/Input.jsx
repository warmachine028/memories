import { TextField, Grid, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				name={name}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
				label={label}
				autoFocus={autoFocus}
				type={type}
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
