import {
	List,
	ListItem,
	ListItemText,
	Typography,
	Box,
	Paper
} from '@mui/material'
import { Link, useNavigate } from 'react-router'

const TrendingTags = ({ tags }) => {
	const navigate = useNavigate()
	return (
		<Paper sx={{ p: 2 }} role="presentation" elevation={0}>
			<Typography variant="h6" gutterBottom>
				Trending Topics
			</Typography>
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
		</Paper>
	)
}

export default TrendingTags
