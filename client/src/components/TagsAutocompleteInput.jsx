import { useSearchTags } from '@/hooks'
import { AutoAwesome } from '@mui/icons-material'
import {
	Autocomplete,
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField
} from '@mui/material'
import { useState } from 'react'

const TagsAutocompleteInput = ({ formData, setFormData, error }) => {
	const [input, setInput] = useState('')

	const { data: options = [], isLoading } = useSearchTags(input)

	const generateTags = () => {
		const aIGenerateTags = ['social', 'media', 'post']
		setFormData({
			...formData,
			tags: [
				...new Set([...formData.tags, ...aIGenerateTags].slice(0, 8))
			]
		})
	}
	const handleChange = (_, value) =>
		setFormData((prevData) => ({
			...prevData,
			tags: value.length > 8 ? value.slice(-8) : value
		}))

	return (
		<Autocomplete
			multiple
			freeSolo
			options={options}
			loading={isLoading}
			inputValue={input}
			value={formData.tags}
			onChange={handleChange}
			onInputChange={(_, newInput) => setInput(newInput)}
			disableClearable
			renderInput={(params) => (
				<TextField
					{...params}
					label="Tags"
					error={error}
					slotProps={{
						input: {
							...params.InputProps,
							type: 'search',
							endAdornment: (
								<InputAdornment position="end">
									{isLoading ? (
										<CircularProgress size={20} />
									) : (
										<IconButton
											onClick={generateTags}
											disabled={formData.tags.length >= 8}
											edge="end"
											size="small"
										>
											<AutoAwesome />
										</IconButton>
									)}
								</InputAdornment>
							)
						}
					}}
				/>
			)}
		/>
	)
}

export default TagsAutocompleteInput
