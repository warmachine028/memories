import moment from "moment";
import CommentSection from "./CommentSection";
import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Root, classes } from "./styles"
import { getPost, getPostsBySearch } from "../../actions/posts";
// import { posts, isLoading } from "../temp"
// const post = posts[0]

const PostDetails = ({ user }) => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);

    const dispatch = useDispatch()
    const history = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getPost(id))
    }, [id, dispatch])
    useEffect(() => {
        if (post) dispatch(getPostsBySearch({ search: "none", tags: post?.tags.join(",") }))
    }, [post, dispatch])

    const openPost = _id => history(`/posts/${_id}`)

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)
    if (!post && !isLoading) return " No Posts"

    return isLoading ? (
        <Root className={classes.root}>
            <Paper className={classes.loadingPaper} style={{ alignItems: "center" }} elevation={6}>
                <CircularProgress size="7em" />
            </Paper>
        </Root>
    ) : (
        <Root className={classes.root}>
            <Paper className={classes.loadingPaper} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <div className={classes.imageSection}>
                            <img
                                className={classes.media}
                                src={post.selectedFile || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"}
                                alt={post.title}
                            />
                        </div>
                        <Typography variant="h3" className={classes.title}>
                            {post.title}
                        </Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2" className={classes.tags}>
                            {post.tags.map(tag => `#${tag} `)}
                        </Typography>
                        {post._private && (
                            <div style={{ margin: "0 0 20px 0" }} align="center">
                                <Button className={classes.privateLabel} variant="contained" size="small" disableElevation>
                                    PRIVATE
                                </Button>
                            </div>
                        )}
                        <Typography className={classes.paragraph} gutterBottom variant="body1" component="p">
                            {post.message}
                        </Typography>
                        <Typography variant="h6">Created by: {post.name}</Typography>
                        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                        <Divider style={{ margin: "20px 0" }} />
                        <CommentSection post={post} user={user} />
                        <Divider style={{ margin: "20px 0" }} />
                    </div>
                </div>

                {recommendedPosts.length ? (
                    <div className={classes.section}>
                        <Typography gutterBottom variant="h5">
                            You might also like:
                        </Typography>
                        <Divider />
                        <Grid className={classes.recommendedPosts}>
                            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                                <div style={{ margin: "20px", cursor: "pointer", maxWidth: "200px" }} onClick={() => openPost(_id)} key={_id}>
                                    <Typography gutterBottom variant="h6" textAlign="center">
                                        {title}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" sx={{ color: "white" }}>
                                        By: <i>{name}</i>
                                    </Typography>
                                    <img src={selectedFile} alt={"selected File"} width="200px" />
                                    <Typography gutterBottom variant="subtitle2" textAlign="justify" sx={{ color: "white" }}>{`${message.slice(0, 200)} ${
                                        message.length > 200 ? "..." : ""
                                    }`}</Typography>
                                    <Typography gutterBottom variant="subtitle1" sx={{ color: "white" }}>
                                        Likes: {likes.length}
                                    </Typography>
                                </div>
                            ))}
                        </Grid>
                    </div>
                ) : null}
            </Paper>
        </Root>
    )
}

export default PostDetails;
