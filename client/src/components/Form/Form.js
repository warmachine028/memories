import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Switch } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

// GET THE CURRENT ID 
const Form = ({ currentId, setCurrentId }) => {
	const initial = { title: "", message: "", tags: "", selectedFile: "", _private: false};
	const [postData, setPostData] = useState(initial);
	const [private_, setPrivate] = useState(postData._private);
	const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));
	const history = useNavigate();
	useEffect(() => { if (post) {setPostData(post); setPrivate(post._private);} }, [post]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (currentId === 0) 
			dispatch(createPost({ ...postData, name: user?.result?.name }, history));
		else 
			dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
		clear();
	};

	const clear = () => {
		setCurrentId(0);
		setPostData(initial);
		setPrivate(initial._private);
	}

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">Please Sign In to create your memories with us and like other's memories.</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper} elevation={6}>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
				<Typography variant="h6">{currentId ? `Editing ${post.title}` : 'Creating a Memory'}</Typography>
				<div className={classes.fileInput}><Switch checked={private_} color="primary" onClick={() => setPrivate(!private_)} onChange={() => setPostData({ ...postData, _private: !private_ })} />Private Memory</div>
				<TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
				<TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
				<TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
				<div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}></FileBase></div>
				<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{currentId ? 'Update': 'Submit'}</Button>
				<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>{currentId ? 'CANCEL' : 'CLEAR'}</Button>
			</form>
		</Paper>
	);
};

export default Form;
