import { useState, useEffect } from 'react'
import { TextField, Typography, Paper, Button } from '@mui/material'
import ChipInput from '../ChipInput/ChipInput'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Root, classes } from './styles'
import { createPost, updatePost } from '../../actions/posts'
import { compress, FileInput } from './FileInput/FileInput'
import PrivateSwitch from './PrivateSwitch/PrivateSwitch'

const initial = { title: '', message: '', tags: [], selectedFile: null, _private: false }

const Form = ({ currentId, setCurrentId, user, snackBar }) => {
	const [postData, setPostData] = useState(initial)
	const [private_, setPrivate] = useState(postData._private)
	const [tags, setTags] = useState(postData.tags)
	const [fileName, setFileName] = useState('No post selected')
	const [oldLabel, setOldLabel] = useState(fileName)
	const [dragging, setDragging] = useState(false)
	const [media, setMedia] = useState(postData.selectedFile)
	const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null))
	const validate = !(postData.title.trim() && postData.message.trim() && media && postData.tags.length)

	const dispatch = useDispatch()
	const history = useNavigate()

	useEffect(() => {
		if (post) {
			setPostData(post)
			setPrivate(post._private)
			setTags(post.tags)
			setFileName('Previous Image')
			setOldLabel('Previous Image')
			setMedia(post.selectedFile)
		}
	}, [post])

	const dragEnter = (e) => {
		e.preventDefault()
		setFileName('Uploading File')
	}

	const fileDrop = (e) => {
		e.preventDefault()
		compress(postData, setPostData, setFileName, setMedia, e)
	}

	const dragLeave = (e) => {
		e.preventDefault()
		setFileName(oldLabel)
	}

	useEffect(() => {
		if (dragEnter) setDragging(true)
		setDragging(false)
	}, [setDragging])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (currentId === 0) dispatch(createPost({ ...postData, name: user.result.name }, history, snackBar))
		else dispatch(updatePost(currentId, { ...postData, name: user.result.name }, snackBar))
		clear()
	}

	const clear = () => {
		setCurrentId(0)
		setTags([])
		setPostData(initial)
		setPrivate(initial._private)
		setMediaEmpty()
	}

	const setMediaEmpty = () => {
		setMedia(null)
		setFileName('No post selected')
	}

	const handleAdd = (tag) => {
		const array = [...tags, tag]
		setTags(array)
		setPostData({ ...postData, tags: array })
	}
	const handleDelete = (tagToDelete) => {
		const array = tags.filter((tag) => tag !== tagToDelete)
		setTags(array)
		setPostData({ ...postData, tags: array })
	}

	if (!user?.result?.name) {
		return (
			<Root className={classes.root}>
				<Paper className={classes.paper} elevation={6}>
					<Typography variant="h6" align="center">
						Please Sign In to create your memories with us and like other&apos;s memories.
					</Typography>
				</Paper>
			</Root>
		)
	}
	return (
		<Root className={dragging ? classes.drag : classes.root} onDragEnter={dragEnter} onDragOver={dragEnter} onDragLeave={dragLeave} onDrop={fileDrop}>
			<Paper className={classes.paper} elevation={6}>
				<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
					<Typography style={{ color: 'white', textAlign: 'center' }} variant="h6">
						{currentId ? `Editing ${post.title}` : 'Create a Memory'}
					</Typography>
					<PrivateSwitch private_={private_} postData={postData} setPrivate={setPrivate} setPostData={setPostData} />
					<FileInput postData={postData} setPostData={setPostData} classes={classes} fileName={fileName} setFileName={setFileName} media={media} setMedia={setMedia} setEmpty={setMediaEmpty} />
					<TextField sx={{ input: { color: 'white' } }} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
					<TextField InputProps={{ style: { color: 'white' } }} name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
					<ChipInput fullWidth InputProps={{ style: { color: 'white' } }} value={postData.tags} newChipKeyCodes={[188, 13]} onAdd={handleAdd} onDelete={handleDelete} label="Tags" variant="outlined" className={classes.chip} />
					<Button className={classes.buttonSubmit} disabled={validate} variant="contained" color="primary" type="submit" fullWidth>
						{currentId ? 'Update' : 'Submit'}
					</Button>
					<Button className={classes.buttonSubmit} variant="contained" color="secondary" onClick={clear} fullWidth>
						{currentId ? 'CANCEL' : 'CLEAR'}
					</Button>
				</form>
			</Paper>
		</Root>
	)
}

export default Form
