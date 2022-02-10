import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
import { Root, classes } from "./styles"

const CommentSection = ({ post, user }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState(post?.comments);
	const commentsRef = useRef();

	const handleComment = async () => {
		const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
		setComment("");
		setComments(newComments);
		commentsRef.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
        <Root className={classes.root}>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant="h6"> Comment </Typography>
					{comments?.map((c, i) => (<Typography key={i} gutterBottom variant="subtitle1" style={{color: "white"}}><strong>{c.split(": ")[0]}</strong>: {c.split(":")[1]}</Typography>))}
					<div ref={commentsRef} />
				</div>
				{user?.result?.name && (
					<div style={{ width: "100%" }}>
						<Typography gutterBottom variant="h6"> Write a comment </Typography>
						<TextField InputProps={{style: {color: 'white'}} } fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)}/>
						<br />
						<Button style={{ marginTop: "10px" }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment} > Comment </Button>
					</div>
				)}
			</div>
        </Root>
	);
};

export default CommentSection;
