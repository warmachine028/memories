import React, { useState, useEffect } from "react"
import { TextField, Typography, Paper, Switch, Button } from "@mui/material"
import ChipInput from "../ChipInput/ChipInput"
import FileBase from "react-file-base64"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Root, classes } from "./styles"
import { createPost, updatePost } from "../../actions/posts"

const Form = ({ currentId, setCurrentId, user }) => {
    const initial = { title: "", message: "", tags: [], selectedFile: "", _private: false }
    const [postData, setPostData] = useState(initial)
    const [private_, setPrivate] = useState(postData._private)
    const [tags, setTags] = useState(postData.tags)
    const post = useSelector(state => (currentId ? state.posts.posts.find(p => p._id === currentId) : null))
    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(() => {
        if (post) {
            setPostData(post)
            setPrivate(post._private)
            setTags(post.tags)
        }
    }, [post])

    const handleSubmit = async e => {
        e.preventDefault()
        if (currentId === 0) dispatch(createPost({ ...postData, name: user?.result?.name }, history))
        else dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
        clear()
    }

    const clear = () => {
        setCurrentId(0)
        setTags([])
        setPostData(initial)
        setPrivate(initial._private)
    }

    if (!user?.result?.name) {
        return (
            <Root className={classes.root}>
                <Paper className={classes.paper} elevation={6}>
                    <Typography variant="h6" align="center">
                        Please Sign In to create your memories with us and like other's memories.
                    </Typography>
                </Paper>
            </Root>
        )
    }
    
    const handleAdd = tag => {
        const array = [...tags, tag]
        setTags(array)
        setPostData({ ...postData, tags: array })
    }
    const handleDelete = tagToDelete => {
        const array = tags.filter(tag => tag !== tagToDelete)
        setTags(array)
        setPostData({ ...postData, tags: array })
    }

    return (
        <Root className={classes.root}>
            <Paper className={classes.paper} elevation={6}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography style={{color: "white", textAlign: "center"}} variant="h6">{currentId ? `Editing ${post.title}` : "Create a Memory"}</Typography>
                    <div className={classes.privateSwitch}>
                        <Switch checked={private_} color="primary" onClick={() => setPrivate(!private_)} onChange={() => setPostData({ ...postData, _private: !private_ })} />
                        <Typography fontSize={15} style={{color: "white"}}> Private </Typography>
                    </div>
                    <TextField sx={{input: { color: 'white' }}} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })} />
                    <TextField InputProps={{style: {color: 'white'}} }
                        name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={e => setPostData({ ...postData, message: e.target.value })} />
                    <ChipInput fullWidth InputProps={{ style: { color: "white" } }} value={postData.tags} newChipKeyCodes={[188, 13]} onAdd={handleAdd} onDelete={handleDelete} label="Tags" variant="outlined" className={classes.chip} onChange={e => e.preventDefault()} />
                    
                    <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}></FileBase></div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary"type="submit" fullWidth>
                        {currentId ? "Update" : "Submit"}
                    </Button>
                    <Button className={classes.buttonSubmit} variant="contained" color="secondary" onClick={clear} fullWidth>
                        {currentId ? "CANCEL" : "CLEAR"}
                    </Button>
                </form>
            </Paper>
        </Root>
    )
}

export default Form
