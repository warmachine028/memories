import express from 'express'
import { signin, signup, updateDetails, getUserDetails, getUserPostsByType, forgotPassword, resetPassword, googleSignin } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/googlesignin', googleSignin)
router.post('/signup', signup)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.patch('/update', updateDetails)
router.get('/details/:id', auth, getUserDetails)
router.get('/posts/:id', auth, getUserPostsByType)

export default router
