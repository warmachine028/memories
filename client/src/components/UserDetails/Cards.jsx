import { Paper, Typography, CircularProgress, Divider, Button, Grid, Avatar, Skeleton, Box, Pagination, Stack, ButtonBase, CardActions } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

export const LoadingCard = (props) => {
	return (
		<Card raised sx={{ maxWidth: 345, m: 2, width: 300, backgroundColor: 'transparent' }}>
			<Skeleton height={190} animation="pulse" variant="rectangular" />
			<CardHeader title={<Skeleton animation="pulse" height={10} width="80%" style={{ marginBottom: 6 }} />} subheader={<Skeleton animation="wave" height={10} width="40%" />} />
			<CardContent style={{ alignItems: 'center' }}>
				<div style={{ height: 190 }}>
					<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
					<Skeleton animation="wave" height={10} width="80%" />
				</div>
			</CardContent>
		</Card>
	)
}

export const PostCard = ({ post }) => {
	const history = useNavigate()
	const { title, message, name, tags, _private, selectedFile, likes, createdAt, _id } = post
	return (
		<Card raised sx={{ maxWidth: 300, m: 2, backgroundColor: 'rgba(255, 255, 255, .09)', backdropFilter: 'blur(10px)' }}>
			<ButtonBase sx={{ width: '100%', padding: '0', display: 'inline-flex', justifyContent: 'space-between', flexDirection: 'column' }} onClick={() => 'history(`/posts/${_id}`)'} component="span">
				<CardMedia sx={{ height: 200, backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundBlendMode: 'darken', filter: 'brightness(.8)' }} component="img" image={selectedFile} />
				<div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 270 }}>
					<div style={{ position: 'absolute', top: 20, left: 20 }}>
						<Typography variant="h6" sx={{ color: 'white' }}>
							{name}
						</Typography>
						<Typography variant="body2" sx={{ color: 'white' }}>
							{moment(createdAt).fromNow()}
						</Typography>
					</div>
					<CardContent sx={{ alignSelf: 'flex-start' }}>
						<Typography variant="body2" color="text.secondary" component="p" style={{ textOverflow: 'ellipsis' }}>
							{tags
								.map((tag) => `#${tag} `)
								.join(' ')
								.slice(0, 50)}
						</Typography>
					</CardContent>
					<div style={{ textAlign: 'center' }}>
						<Typography variant="h5" align="center" gutterBottom>
							{title}
						</Typography>
						{_private && (
							<div align="center">
								<Button variant="contained" size="small" disableElevation>
									PRIVATE
								</Button>
							</div>
						)}
						<CardContent>
							<Typography variant="body2" color="text.secondary" component="p">
								{`${message.slice(0, 100)} ${message.length > 100 ? '...' : ''}`}
							</Typography>
						</CardContent>
					</div>
					<CardActions
						style={{
							padding: '0 16px 8px 16px',
							display: 'flex',
							justifyContent: 'space-between',
							width: '100%',
							position: 'absolute',
							bottom: 10,
							left: 10,
						}}
					>
						<Button size="small" color="primary" style={{ align: 'center' }}>
							<Typography variant="body2" sx={{ align: 'center', display: 'flex' }}>
								<ThumbUpAltIcon fontSize="small" />
								&nbsp; {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} Like${likes.length > 1 ? 's' : ''}`}
							</Typography>
						</Button>
					</CardActions>
				</div>
			</ButtonBase>
		</Card>
	)
}

export default PostCard
