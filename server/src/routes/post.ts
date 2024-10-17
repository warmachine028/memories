import { Elysia } from 'elysia'
import { getPosts, getPostById, createPost } from '@/controllers'

export const postRoutes = new Elysia({ prefix: '/posts' })
	.get('/', getPosts)
	.post('/', createPost)
	.get('/:id', getPostById)

