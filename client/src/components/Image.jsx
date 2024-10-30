import { Box, useTheme } from '@mui/material'

const getBreakpoints = () => {
	const theme = useTheme()
	return [
		theme.breakpoints.values.xs,
		theme.breakpoints.values.sm,
		theme.breakpoints.values.md,
		theme.breakpoints.values.lg,
		theme.breakpoints.values.xl
	]
}

const Image = ({
	publicId, //
	alt,
	sizes = '(max-width: 600px) 100vw, (max-width: 960px) 50vw, 800px',
	...props
}) => {
	// These are common responsive breakpoints
	const breakpoints = getBreakpoints()

	// Cloudinary optimization parameters:
	const baseUrl = 'https://res.cloudinary.com/memories-pk/image/upload'
	const optimizations = 'f_auto,q_auto,c_fill,g_auto'

	const srcSet = breakpoints
		.map((breakpoint) => {
			const url = `${baseUrl}/${optimizations},w_${breakpoint}/${publicId}`
			return `${url} ${breakpoint}w`
		})
		.join(', ')

	const url = `${baseUrl}/${optimizations}/${publicId}`

	return (
		<Box sx={{ position: 'relative', ...props.sx }}>
			<Box
				component="img"
				src={url}
				srcSet={srcSet}
				sizes={sizes}
				alt={alt}
				loading="lazy"
				sx={{
					objectFit: 'cover',
					width: '100%',
					height: '100%'
				}}
			/>
		</Box>
	)
}

export default Image
