import express from 'express'
import { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, deleteComment, commentPost, likePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// http://localhost:5000/posts/
router.get('/', auth, getPosts)
router.get('/search', auth, getPostsBySearch)
router.get('/:id', auth, getPost)

router.post('/', auth, createPost)
router.post('/:id/commentPost', auth, commentPost)

router.delete('/:id', auth, deletePost)

router.patch('/:id/deleteComment', deleteComment)
router.patch('/:id', auth, updatePost)
router.patch('/:id/likePost', auth, likePost)

export default router
