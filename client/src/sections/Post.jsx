import { Comment, Person, Share, ThumbUpAltSharp } from '@mui/icons-material'
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Divider, IconButton, ListItemText, Paper, Typography } from '@mui/material'
import moment from 'moment'

const AuthorInfo = ({ avatarIcon, authorName, authorEmail, timestamp }) => (
	<Box marginBottom="20px">
		<AuthorDetails avatarIcon={avatarIcon} authorName={authorName} authorEmail={authorEmail} timestamp={timestamp} />
	</Box>
)

const AuthorDetails = ({ avatarIcon, authorName, authorEmail, timestamp }) => (
	<Box display="flex" gap="10px" alignItems="center">
		<Avatar>{avatarIcon}</Avatar>
		<Box>
			<ListItemText primary={`Author: ${authorName}`} secondary={authorEmail} />
			<Typography variant="body2" color="textSecondary" component="p">
				<span>
				{moment(timestamp).fromNow()}
				</span>
			</Typography>
		</Box>
	</Box>
)

const PostActions = ({ shareCount, commentCount, likeCount }) => (
	<CardActions
		sx={{
			display: 'flex',
			alignItems: 'self-start',
			flexDirection: 'column'
		}}
	>
		<Box display="flex">
			<IconButton
				color="info"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					gap: 1,
					':hover': { bgcolor: 'transparent' }
				}}
			>
				<Share />
				<Typography component="p">{shareCount}</Typography>
			</IconButton>
			<IconButton
				color="success"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					gap: 1,
					':hover': { bgcolor: 'transparent' }
				}}
			>
				<Comment />
				<Typography component="p">{commentCount}</Typography>
			</IconButton>
			<IconButton
				color="primary"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					gap: 1,
					':hover': { bgcolor: 'transparent' }
				}}
			>
				<ThumbUpAltSharp />
				<Typography component="p">{likeCount}</Typography>
			</IconButton>
		</Box>
	</CardActions>
)

const Post = () => {
	return (
		<Paper
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '400px'
			}}
		>
			<Card>
				<CardMedia component="img" sx={{ maxHeight: 300, objectFit: 'contain' }} image="favicon.ico" alt="green iguana" />
				<CardContent>
					<AuthorInfo avatarIcon={<Person />} authorName="Saul Goodman" authorEmail="lorem@epsum.com" timestamp={Date.now()} />
					<Typography variant="h4" marginBottom="30px">
						Post Title
					</Typography>
					<Divider />
					<Typography variant="body1" component="p" marginTop="30px">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque tempore distinctio nobis et numquam accusantium minus iusto laboriosam enim eveniet. Esse cupiditate culpa quaerat animi harum, nam enim illo odit!
					</Typography>
				</CardContent>
				<PostActions shareCount={20} commentCount={20} likeCount={20} />
			</Card>
		</Paper>
	)
}

export default Post
