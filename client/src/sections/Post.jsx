import { Comment, Person, Share, ThumbUpAltSharp } from '@mui/icons-material'
import { Avatar, Box, Divider, IconButton, List, ListItemText, Paper, Stack, Typography } from '@mui/material'
import moment from 'moment'

const AuthorInfo = ({ avatarIcon, name, email, timestamp }) => (
	<Box marginBottom={3}>
		<Box display="flex" gap={2} alignItems="center">
			<Avatar>{avatarIcon}</Avatar>
			<List>
				<ListItemText primary={`By: ${name}`} secondary={email} />
				<Typography variant="body2" color="textSecondary" component="p">
					<span>{moment(timestamp).fromNow()}</span>
				</Typography>
			</List>
		</Box>
	</Box>
)

// const PostActions = ({ shareCount, commentCount, likeCount }) => (

// )

const Post = () => {
	return (
		<Paper
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: 50,
				p: 2
			}}
		>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Box sx={{ objectFit: 'cover' }}>
					<img src="favicon.ico" alt="green iguana" style={{ maxHeight: 300 }} />
				</Box>
				<Box>
					<Typography fontWeight="bold" variant="h4" marginBottom={4}>
						Post Title
					</Typography>
					<Divider />
					<Typography variant="body1" component="p" marginTop={4}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque tempore distinctio nobis et numquam accusantium minus iusto laboriosam enim eveniet. Esse cupiditate culpa quaerat animi harum, nam enim illo odit!
					</Typography>
					<AuthorInfo avatarIcon={<Person />} name="Saul Goodman" email="lorem@epsum.com" timestamp={Date.now()} />
				</Box>
				<Stack direction="row" alignItems="flex-start">
					<IconButton color="info" sx={{ display: 'flex', justifyContent: 'center', gap: 1, ':hover': { bgcolor: 'transparent' } }}>
						<Share />
						<Typography component="p">10</Typography>
					</IconButton>
					<IconButton color="success" sx={{ display: 'flex', justifyContent: 'center', ':hover': { bgcolor: 'transparent' }, gap: 1 }}>
						<Comment />
						<Typography component="p">12</Typography>
					</IconButton>
					<IconButton color="primary" sx={{ display: 'flex', justifyContent: 'center', gap: 1, ':hover': { bgcolor: 'transparent' } }}>
						<ThumbUpAltSharp />
						<Typography component="p">19</Typography>
					</IconButton>
				</Stack>
			</Box>
		</Paper>
	)
}

export default Post
