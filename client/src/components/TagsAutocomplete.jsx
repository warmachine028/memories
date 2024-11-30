import { useSearchTags } from '@/hooks'
import { AutoAwesome } from '@mui/icons-material'
import {
	Autocomplete,
	CircularProgress,
	IconButton,
	InputAdornment,
	ListItem,
	ListItemText,
	TextField,
	Typography
} from '@mui/material'
import { useState } from 'react'

// Tag sanitization function
const sanitizeTag = (tag) => {
	if (!tag) {
		return ''
	} // Handle empty strings

	return tag
		.toLowerCase() // Convert to lowercase
		.replace(/[^a-z0-9]/g, '') // Remove special characters and spaces
		.slice(0, 10) // Limit to 10 characters
}

// Validate if a tag is acceptable
const isValidTag = (tag) => {
	const sanitized = sanitizeTag(tag)
	return sanitized.length > 0 && sanitized.length <= 10
}

const TagsAutocomplete = ({ formData, setFormData, error }) => {
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
	const handleChange = (_, value) => {
		// Sanitize all tags and filter out invalid ones
		const sanitizedTags = value.map(sanitizeTag).filter(isValidTag)
		const uniqueTags = [...new Set(sanitizedTags)].slice(0, 8)

		setFormData((prevData) => ({
			...prevData,
			tags: uniqueTags
		}))
	}
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			const value = event.target.value
			if (value && (!isValidTag(value) || value.length > 10)) {
				event.preventDefault()
			}
		}
	}
	const sanitizedOptions = options.map(sanitizeTag).filter(isValidTag)

	// Highlight matching text in option
	// const highlightMatch = (text, searchTerm) => {
	// 	if (!searchTerm) return text

	// 	return (

	// 	)
	// }

	return (
		<Autocomplete
			multiple
			freeSolo
			renderOption={(props, option) => (
				<ListItem {...props} key={option}>
					<ListItemText
						component="span"
						primary={option
							.split(new RegExp(`(${input})`, 'gi'))
							.map((part, index) =>
								part.toLowerCase() === input.toLowerCase() ? (
									<Typography
										component="span"
										fontWeight="bold"
										color="primary.main"
										px='2px'
										key={index}
									>
										{part}
									</Typography>
								) : (
									<Typography key={index} component="span">
										{part}
									</Typography>
								)
							)}
					/>
				</ListItem>
			)}
			options={sanitizedOptions}
			loading={isLoading}
			inputValue={input}
			value={formData.tags}
			onChange={handleChange}
			onInputChange={(_, newInput) => {
				// Only update input if it would create a valid tag
				if (!newInput || isValidTag(newInput)) {
					setInput(newInput.toLowerCase())
				}
			}}
			onKeyDown={handleKeyDown}
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

export default TagsAutocomplete
