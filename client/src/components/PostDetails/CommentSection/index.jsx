import { useState, useRef, useEffect, useContext } from 'react'
import { Typography, TextField, Button, IconButton, Avatar, Grow, CircularProgress, Grid } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Root, classes } from './styles'
import moment from 'moment'
import { createComment, getComments, deleteComment } from '../../../actions/comments'
import Avaatar from 'avataaars2'
import { SnackbarContext } from '../../../contexts/SnackbarContext'
import { Link } from 'react-router-dom'

const Comment = ({ data, user, post, mode, handleDelete }) => {
  const userId = user?.result.googleId || user?.result?._id

  const { creator, message, createdAt, _id } = data
  const canDelete = [creator._id, post.creator._id].includes(userId)
  const canEdit = userId === creator._id
  return (
    <Grow in mountOnEnter unmountOnExit>
      <div className={classes.commentContainer}>
        <Grid item xl={2} style={{ maxWidth: 50, marginRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Link to={`/user/${creator._id}`} style={{ textDecoration: 'none' }}>
            {creator.avatar
              ? (
                <Avaatar className={classes.avaatar} avatarStyle='Circle' {...creator.avatar} />
                )
              : (
                <Avatar className={classes.avatar} alt={creator.name} src={creator.image}>
                  {creator.name.charAt(0)}
                </Avatar>
                )}
          </Link>
        </Grid>
        <Grid item className={classes.commentBox}>
          <div className={classes.commentItem}>
            <Typography className={`${classes.userName} ${mode === 'light' ? classes.textColor : classes.darkTextColor}`}>{creator.name}</Typography>
            <Typography className={classes.time}>{moment(createdAt).fromNow()}</Typography>
            <Typography className={classes.comment} component='p'>
              {message}
            </Typography>
          </div>
          {userId && (
            <div style={{ display: 'flex' }}>
              <IconButton aria-label='delete' size='small' style={{ color: '#ae0050', display: canDelete ? 'inline-flex' : 'none' }} onClick={() => handleDelete(_id)}>
                <Delete fontSize='1rem' />
              </IconButton>
              <IconButton aria-label='edit' color='primary' size='small' style={{ display: canEdit ? 'inline-flex' : 'none' }} onClick={() => {}}>
                <Edit fontSize='1rem' />
              </IconButton>
            </div>
          )}
        </Grid>
      </div>
    </Grow>
  )
}

const CommentSection = ({ post, user, mode }) => {
  const { openSnackBar: snackBar } = useContext(SnackbarContext)
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const commentsRef = useRef()
  const userId = user?.result.googleId || user?.result._id
  const { isFetchingComments: loading, comments } = useSelector((state) => state.posts)

  useEffect(() => {
    const fetchComments = async () => {
      dispatch(getComments(post._id, snackBar))
    }
    fetchComments()
  }, [post._id])

  const handleSubmit = (e) => {
    e.preventDefault()
    const comment = { message, post: post._id, creator: userId }
    dispatch(createComment(comment, snackBar))
    setMessage('')
  }

  const handleDelete = (id) => dispatch(deleteComment(id, snackBar))

  return loading ? (
    <CircularProgress size='7em' />
  ) : (
    <Root className={classes.root}>
      <div className={`${classes.outerContainer} ${mode === 'light' ? classes.textColor : classes.darkTextColor}`}>
        <div style={{ width: '100%', display: comments.length ? 'block' : 'none' }}>
          <Typography gutterBottom variant='h6'>
            Comments
          </Typography>
          <div className={classes.innerContainer}>
            <Grid container>
              {comments.map((comment) => (
                <Comment key={comment._id} data={comment} user={user} post={post} mode={mode} handleDelete={handleDelete} />
              ))}
            </Grid>
            <div ref={commentsRef} />
          </div>
        </div>
        <div style={{ width: '100%', display: userId ? 'block' : 'none' }}>
          <Typography gutterBottom variant='h6'>
            Write a comment
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              className={`${mode === 'light' ? classes.commentContainerBox : classes.darkCommentContainerBox}`}
							// InputProps={{ style: { color: 'white', backgroundColor: 'rgba(255,255,255, 0.30)' } }}
              fullWidth
              rows={10}
              variant='outlined'
              label='Comment'
              multiline
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type='submit' fullWidth disabled={!message.trim().length || loading} color='primary' variant='contained' className={`${mode === 'light' ? classes.buttonSubmit : classes.darkButtonSubmit}`}>
              {loading && <CircularProgress size='2em' />} Comment
            </Button>
          </form>
        </div>
      </div>
    </Root>
  )
}

export default CommentSection
