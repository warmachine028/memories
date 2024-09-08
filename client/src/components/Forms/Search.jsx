import { Button, FormControl, FormGroup, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, useTheme } from '@mui/material'
import { useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
}

const names = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'Omar Alexander', 'Carlos Abbott', 'Miriam Wagner', 'Bradley Wilkerson', 'Virginia Andrews', 'Kelly Snyder']

function getStyles(name, personName, theme) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
	}
}

const Search = () => {
	const theme = useTheme()
	const [personName, setPersonName] = useState([])
	const handleChange = (event) => {
		const {
			target: { value }
		} = event
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		)
	}

	return (
		<Paper sx={{ padding: 2 }}>
			<form
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					gap: 5
				}}
				onSubmit={() => {}}
			>
				<div
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: 12,
						marginBottom: 9
					}}
				>
					<FormGroup className="mb-3">
						<TextField id="title" label="Search Memories" variant="outlined" />
					</FormGroup>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Search Tags</InputLabel>
						<Select labelId="demo-multiple-name-label" id="demo-multiple-name" multiple value={personName} onChange={handleChange} input={<OutlinedInput label="Name" />} MenuProps={MenuProps}>
							{names.map((name) => (
								<MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<Button variant="contained" type="submit" color="success" fullWidth>
					Search
				</Button>
			</form>
		</Paper>
	)
}

export default Search
