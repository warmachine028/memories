import express from 'express'
import { signin, signup, getUserDetails, getUserPostsByType } from '../controllers/user.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)

router.get('/details/:id', getUserDetails)
router.get('/posts/:id', getUserPostsByType)

export default router
