import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
import { useContext, useState } from 'react'
import { CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Card, Avatar, Tooltip } from '@mui/material'
import { Root, classes } from './styles'
import { useDispatch } from 'react-redux'
import { deletePost, updatePost } from '../../../actions/posts'
import { Link, useNavigate } from 'react-router-dom'
import { SnackbarContext } from '../../../contexts/SnackbarContext'
import DeleteDialogBox from '../../DialogBox/DeleteDialogBox'
import Avaatar from 'avataaars2'
import { ModeContext } from '../../../contexts/ModeContext'

const Post = ({ post, setCurrentId, user }) => {
  const { openSnackBar: snackBar } = useContext(SnackbarContext)
  const dispatch = useDispatch()
  const history = useNavigate()
  const [likes, setLikes] = useState(post?.likes)
  const userId = user && (user.result.googleId || user.result._id)
  const hasLikedPost = likes.find((like) => like === userId)
  const [deleteing, setDeleteing] = useState(false)

  const handleLike = () => {
    const usersLiked = hasLikedPost ? likes.filter((id) => id !== userId) : [...likes, userId]
    setLikes(usersLiked)
    dispatch(updatePost(post._id, { ...post, likes: usersLiked }))
  }

  const handleDelete = () => {
    dispatch(deletePost(post._id, snackBar, setDeleteing))
  }
  const Likes = () => {
    if (likes.length > 0) {
      return hasLikedPost
        ? (
          <Typography variant='body2' color='primary'>
            <ThumbUpAltIcon fontSize='small' />
            {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} Like${likes.length > 1 ? 's' : ''}`}
          </Typography>
          )
        : (
          <Typography variant='body2'>
            <ThumbUpAltOutlined fontSize='small' />
            {`${likes.length} Like${likes.length > 1 ? 's' : ''}`}
          </Typography>
          )
    }
    return (
      <Typography variant='body2'>
        <ThumbUpAltOutlined fontSize='small' />
				&nbsp; Like
      </Typography>
    )
  }
  const isLongMessage = post.message.length > 100
  const openPost = () => history(`/posts/${post._id}`)

  const { mode } = useContext(ModeContext)

  return (
    <Root className={classes.root}>
      <DeleteDialogBox open={deleteing} setOpen={setDeleteing} post={post} callBack={handleDelete} />
      <Card className={`${classes.cardLight} ${mode === 'light' ? classes.cardLight : classes.cardDark}`} raised elevation={6}>
        <ButtonBase className={classes.cardAction} onClick={openPost} component='span'>
          <CardMedia className={classes.media} image={post.thumbnail} title={post.title} />
          <div className={classes.details}>
            <div className={classes.tags}>
              <Typography variant='body2' color='textSecondary'>
                {post.tags.map((tag) => `#${tag} `)}
              </Typography>
            </div>

            <Typography className={classes.title} variant='h5' align='center' gutterBottom>
              {post.title}
            </Typography>
            {post.private && (
              <div align='center'>
                <Button variant='contained' className={classes.privateLabel} size='small' disableElevation>
                  PRIVATE
                </Button>
              </div>
            )}
            <CardContent>
              <Typography variant='body2' sx={{ color: 'white', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }} component='p' textAlign={isLongMessage ? 'justify' : 'center'}>
                {`${post.message.slice(0, 100)} ${isLongMessage ? '...' : ''}`}
              </Typography>
            </CardContent>
          </div>
        </ButtonBase>
        <div className={classes.overlay}>
          <div style={{ display: 'flex' }}>
            <div style={{ maxWidth: 50, display: 'flex', maxHeight: 100, marginRight: 10 }}>
              <Link to={`/user/${post.creator._id}`} style={{ textDecoration: 'none' }}>
                {post.creator.avatar
                  ? (
                    <Avaatar className={classes.avaatar} avatarStyle='Circle' {...post.creator.avatar} />
                    )
                  : (
                    <Avatar className={classes.avatar} alt={post.creator.name} src={post.creator.image}>
                    {post.creator.name?.charAt(0)}
                  </Avatar>
                    )}
              </Link>
            </div>
            <div style={{ width: '100%' }}>
              <Typography variant='h6' sx={{ color: 'white' }}>
                {post.creator.name}
              </Typography>
              <Tooltip title={moment(post.createdAt).format('Do MMMM YYYY [at] h:mm A')}>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  {moment(post.createdAt).fromNow()}
                </Typography>
              </Tooltip>
            </div>
          </div>
        </div>
        {userId === post.creator._id && (
          <div className={classes.overlay2}>
            <Button style={{ color: 'whitesmoke' }} size='small' onClick={() => setCurrentId(post._id)}>
              <MoreHorizIcon fontSize='medium' />
            </Button>
          </div>
        )}
        <CardActions className={classes.cardActions}>
          <Button size='small' disabled={!user?.result} onClick={handleLike}>
            <Likes />
          </Button>
          {userId === post.creator._id && (
            <Button size='small' style={{ color: '#ae0050' }} onClick={() => setDeleteing(true)}>
              <DeleteIcon fontSize='small' /> &nbsp; Delete{' '}
            </Button>
          )}
        </CardActions>
      </Card>
    </Root>
  )
}

export default Post
