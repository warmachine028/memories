import React from "react";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	return (
		<Card className={classes.card}>
			<CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
			<div className={classes.overlay}>
				<Typography variant="h6" style={{ color: "white" }} >{post.creator}</Typography>
				<Typography variant="body2" style={{ color: "white" }} >{moment(post.createdAt).fromNow()}</Typography>
			</div>
			<div className={classes.overlay2}>
				<Button style={{ color: "whitesmoke" }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
			</div>
			<div className={classes.details}>
				<Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
			</div>
			<Typography className={classes.title} variant="h5" align="center" gutterBottom>{post.title}</Typography>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p" align="center">{post.message}</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button size="small" color="primary" onClick={() => dispatch(likePost(post._id)) }><ThumbUpAltIcon fontSize="small" /> &nbsp; Like {post.likeCount}</Button>
				<Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> &nbsp; Delete </Button>
			</CardActions>
		</Card>
	);
};

export default Post;
