import { type Elysia } from 'elysia'
import { getPosts, getPostById, createPost } from '../controllers'

export const postRoutes = (app: Elysia) =>
	app
		.get('/', getPosts)
		.post('/', createPost)
		.get('/:id', getPostById)
