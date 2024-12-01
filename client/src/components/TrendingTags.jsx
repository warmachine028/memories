import { useTrendingTags } from '@/hooks'
import {
	List,
	ListItem,
	ListItemText,
	Typography,
	Paper,
	CircularProgress
} from '@mui/material'
import { Link } from 'react-router'

const TrendingTags = () => {
	const { data: tags, isPending, error, isError } = useTrendingTags()
	return (
		<Paper sx={{ p: 2 }} role="presentation" elevation={0}>
			<Typography variant="h6" gutterBottom>
				Trending Topics
			</Typography>
			{isPending ? (
				<CircularProgress size={20} />
			) : isError ? (
				<Typography component="p" variant="body" color="red">
					Error loading posts: {error.message}
				</Typography>
			) : (
				<TagsList tags={tags} />
			)}
		</Paper>
	)
}

const TagsList = ({ tags }) => {
	return (
		<List sx={{ p: 0 }}>
			{tags.map((tag) => (
				<ListItem
					key={tag.hashtag}
					to={`/hashtag/${tag.hashtag}`}
					sx={{
						cursor: 'pointer',
						':hover': {
							bgcolor: 'primary.main',
							transition: 'background-color 0.2s'
						},
						p: 0.5,
						px: 1,
						textDecoration: 'none',
						color: 'inherit',
						borderRadius: 1
					}}
					component={Link}
				>
					<ListItemText
						primary={`#${tag.hashtag}`}
						secondary={`${tag.count} posts`}
						primaryTypographyProps={{
							fontWeight: 'medium'
						}}
						secondaryTypographyProps={{
							fontSize: '0.8rem',
							color: 'text.muted'
						}}
					/>
				</ListItem>
			))}
		</List>
	)
}
export default TrendingTags
