import express from "express"
import { getPostsBySearch, getPosts, getUserDetails, getPostsByUser, getPost, createPost, updatePost, deletePost, deleteComment, commentPost, likePost } from "../controllers/posts.js"
import auth from "../middleware/auth.js"

const router = express.Router()

// http://localhost:5000/posts/
router.get("/search", auth, getPostsBySearch)
router.get("/user/:id", auth, getPostsByUser)
router.get('/user/details/:id', getUserDetails)
router.get("/", auth, getPosts)
router.get("/:id", auth, getPost)
router.post("/", auth, createPost)
router.patch("/:id", auth, updatePost)
router.delete("/:id", auth, deletePost)
router.patch("/:id/likePost", auth, likePost)
router.post("/:id/commentPost", auth, commentPost)
router.patch("/:id/deleteComment", deleteComment)

export default router
