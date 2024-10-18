import { Elysia } from 'elysia'
import { getPosts, getPostById, createPost } from '@/controllers'
import { authMiddleware } from '@/middlewares'

export const postRoutes = new Elysia({ prefix: '/posts' })
	.use(authMiddleware) //
	.get('/', getPosts)
	.post('/', createPost)
	.get('/:id', getPostById)
