import { Comment, Person, Share, ThumbUpAltSharp } from '@mui/icons-material'
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Divider, IconButton, ListItemText, Paper, Typography } from '@mui/material'

const Post = () => {
	return (
		<Paper
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '400px',
			}}
		>
			<Card>
				<CardMedia component="img" sx={{ maxHeight: 300, objectFit: 'contain' }} image="favicon.ico" alt="green iguana" />
				<CardContent>
					<Box marginBottom="20px">
						<Box display="flex" gap="10px" alignItems="center">
							<Avatar>
								<Person />
							</Avatar>
							<Box>
								<ListItemText primary="Author: Lorem Epsum" secondary="lorem@epsum.com" />
								<Typography variant="body2" color="textSecondary" component="p">
									<span>@</span> 12:00 PM yesterday
								</Typography>
							</Box>
						</Box>
					</Box>
					<Typography variant="h4" marginBottom="30px">
						Post Title
					</Typography>

					<Divider />
					<Typography variant="body1" component="p" marginTop="30px">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque tempore distinctio nobis et numquam accusantium minus iusto laboriosam enim eveniet. Esse cupiditate culpa quaerat animi harum, nam enim illo odit!
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						alignItems: 'self-start',
						flexDirection: 'column',
					}}
				>
					<Box display="flex">
						<IconButton
							color="info"
							sx={{
								display: 'flex',
								justifyContent: 'center',
								gap: 1,
								':hover': { bgcolor: 'transparent' },
							}}
						>
							<Share />
							<Typography component="p">20</Typography>
						</IconButton>
						<IconButton
							color="success"
							sx={{
								display: 'flex',
								justifyContent: 'center',
								gap: 1,
								':hover': { bgcolor: 'transparent' },
							}}
						>
							<Comment />
							<Typography component="p">20</Typography>
						</IconButton>
						<IconButton
							color="primary"
							sx={{
								display: 'flex',
								justifyContent: 'center',
								gap: 1,
								':hover': { bgcolor: 'transparent' },
							}}
						>
							<ThumbUpAltSharp />
							<Typography component="p">20</Typography>
						</IconButton>
					</Box>
				</CardActions>
			</Card>
		</Paper>
	)
}

export default Post
