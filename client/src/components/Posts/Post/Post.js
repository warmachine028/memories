import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));
	const history = useNavigate();
	const [likes, setLikes] = useState(post?.likes);
	const userId = user?.result.googleId || user?.result?._id;
	const hasLikedPost = likes.find((like) => like === userId);

	const handleLike = async () => {
		dispatch(likePost(post._id)); 
		if (hasLikedPost)
			setLikes(likes.filter((id) =>  id !== userId))
		else 
			setLikes([...likes, userId]);
		
	}
	const Likes = () => {
		if (likes.length > 0) {
			return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
				? (
				<><ThumbUpAltIcon fontSize="small" />&nbsp; {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
				) : (
				<><ThumbUpAltOutlined fontSize="small" />&nbsp; {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
				);
			}
		return <><ThumbUpAltOutlined fontSize="small" />&nbsp; Like</>;
	};

	const openPost = (e) => history(`/posts/${post._id}`);
	

	return (
		<Card className={classes.card} raised elevation={6}>
			<ButtonBase className={classes.cardAction} onClick={openPost} component="span" name="test">
				<CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
				<div className={classes.overlay}>
					<Typography variant="h6" style={{ color: "white" }} >{post.name}</Typography>
					<Typography variant="body2" style={{ color: "white" }} >{moment(post.createdAt).fromNow()}</Typography>
				</div>
				
				<div className={classes.details}>
					<Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
				</div>
				<Typography className={classes.title} variant="h5" align="center" gutterBottom>{post.title}</Typography>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p" align="center">{post.message}</Typography>
				</CardContent>
			</ButtonBase>
			{(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
					<div className={classes.overlay2}>
						<Button style={{ color: "whitesmoke" }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
					</div>
			}
			<CardActions className={classes.cardActions}>
				<Button size="small" color="primary" disabled={ !user?.result } onClick={handleLike}><Likes /></Button>
				{(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && 
					<Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> &nbsp; Delete </Button>
				} 
			</CardActions>
		</Card>
	);
};

export default Post;
