import React from "react"
import Post from "./Post/Post"
import { Grid, CircularProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { Root, classes } from "./styles"
// import { posts, isLoading } from "../../temp"

const Posts = ({ setCurrentId, user }) => {
    const { posts, isLoading } = useSelector(state => state.posts) // [] -> { isLoading, posts: [] }
    if (!posts.length && !isLoading) return "No Posts"
    return <Root className={classes.root}>
        {isLoading ? <CircularProgress /> :
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts?.map(post => 
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} user={user} />
                    </Grid>)
                }
            </Grid>
        }
        </Root>
}

export default Posts
