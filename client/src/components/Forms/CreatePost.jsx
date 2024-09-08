import { Box, Button, FormGroup, Paper, TextField, Typography, FormControl } from '@mui/material'
// import { useState } from 'react'
// import { MuiChipsInput } from 'mui-chips-input'
const CreatePost = () => {
  // const [chips, setChips] = useState([])
  // const handleChange = (newChips) => {
  // 	setChips(newChips)
  // }
  return (
    <Paper sx={{ padding: 2 }}>
      <form
        style={{
				  display: 'flex',
				  alignItems: 'center',
				  flexDirection: 'column',
				  gap: 5
        }}
      >
        <Typography variant='h6'>Create a Post</Typography>
        <Box
          style={{
					  width: '100%',
					  display: 'flex',
					  flexDirection: 'column',
					  gap: 12,
					  marginBottom: 9
          }}
        >
          <FormGroup className='mb-3'>
            <TextField id='title' label='Title' variant='outlined' />
          </FormGroup>
          <FormGroup className='mb-3'>
            <TextField id='description' label='Description' variant='outlined' rows={4} multiline />
          </FormGroup>
          <FormControl fullWidth>
            <TextField id='tags' label='Tags' variant='outlined' />
            {/* <MuiChipsInput value={chips} onChange={handleChange} /> */}
            {/* <Select labelId="demo-multiple-name-label" id="demo-multiple-name" multiple value={personName} onChange={handleChange} input={<OutlinedInput label="Name" />} MenuProps={MenuProps}>
							{names.map((name) => (
								<MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
									{name}
								</MenuItem>
							))}
						</Select> */}
          </FormControl>
        </Box>
        <Button variant='contained' type='submit' fullWidth>
          Create
        </Button>
        <Button variant='contained' color='secondary' type='clear' fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default CreatePost
