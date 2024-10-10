import express from 'express'
import { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost,getAllTags } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// http://localhost:5000/posts/
router.get('/', auth, getPosts)
router.get('/tags', auth, getAllTags)
router.get('/search', auth, getPostsBySearch)
router.get('/:id', auth, getPost)
router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)
router.patch('/:id', auth, updatePost)

export default router
