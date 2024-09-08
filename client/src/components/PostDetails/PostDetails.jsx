import moment from 'moment'
import CommentSection from './CommentSection'
import RecommendedPosts from './RecommendedPosts'
import { useContext, useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Root, classes } from './styles'
import { getPost } from '../../actions/posts'
import { SnackbarContext } from '../../contexts/SnackbarContext'
import { ModeContext } from '../../contexts/ModeContext'

// import { posts, isLoading } from '../../temp'
// const post = posts[0]

const PostDetails = ({ user }) => {
  const { openSnackBar: snackBar } = useContext(SnackbarContext)
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useNavigate()

  useEffect(() => {
    async function fetchPosts () {
      dispatch(getPost(id, history, snackBar))
    }
    fetchPosts()
  }, [id])

  const { post, isLoading } = useSelector((state) => state.posts)

  const { mode } = useContext(ModeContext)

  return isLoading || !post
    ? (
      <Root className={classes.root}>
        <Paper className={`${classes.loadingPaperLight} ${mode === 'light' ? classes.loadingPaperLight : classes.loadingPaperDark}`} style={{ alignItems: 'center' }} elevation={6}>
          <CircularProgress size='7em' />
        </Paper>
      </Root>
      )
    : (
      <Root className={classes.root}>
        <Paper className={`${classes.loadingPaperLight} ${mode === 'light' ? classes.loadingPaperLight : classes.loadingPaperDark}`} elevation={6}>
          <div className={classes.card}>
            <div className={classes.section}>
              <div className={classes.imageSection}>
                <img className={classes.media} src={post.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
              </div>
              <Typography variant='h2' className={`${classes.title} ${mode === 'light' ? classes.textColor : classes.darkTextColor}`}>
                {post.title}
              </Typography>
              <Typography gutterBottom variant='h6' color='textSecondary' component='h2' className={`${classes.tags} ${mode === 'light' ? classes.textColor : classes.darkTextColor}`}>
                {post.tags.map((tag) => `#${tag} `)}
              </Typography>
              <div style={{ margin: '0 0 20px 0', display: post.private ? 'block' : 'none' }} align='center'>
                <Button className={classes.privateLabel} variant='contained' size='small' disableElevation>
                  PRIVATE
                </Button>
              </div>
              <Typography className={classes.paragraph} gutterBottom variant='body1' component='p'>
                {post.message}
              </Typography>
              <Typography variant='h6' className={`${mode === 'light' ? classes.textColor : classes.darkTextColor}`}>
                Created by: {post.creator.name}
              </Typography>
              <Typography variant='body1' className={`${mode === 'light' ? classes.textColor : classes.darkTextColor}`}>
                {moment(post.createdAt).format('Do MMMM YYYY, dddd, h:mm A')}
              </Typography>
              <Divider style={{ margin: '20px 0' }} />
              <CommentSection post={post} user={user} mode={mode} />
            </div>
          </div>
        </Paper>
        <Paper className={`${classes.loadingPaperLight} ${mode === 'light' ? classes.loadingPaperLight : classes.loadingPaperDark}`} elevation={6} sx={{ marginTop: 1 }}>
          <RecommendedPosts tags={post.tags} user={user} post_id={post._id} />
        </Paper>
      </Root>
      )
}

export default PostDetails
