import { TextField, Grid, InputAdornment, IconButton, AppBar } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Root, classes } from './styles'
import { ModeContext } from '../../contexts/ModeContext'
import { useContext, useState } from 'react'
const Input = ({ name, half, type, handleShowPassword, ...props }) => {
	const { mode } = useContext(ModeContext)
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<Root className={classes.root}>
				<AppBar className={`${classes.searchBarLight} ${mode === 'light' ? classes.searchBarLight : classes.searchBarDark}`} position="static" color="inherit">
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
				</AppBar>
			</Root>
		</Grid>
	)
}

export default Input
