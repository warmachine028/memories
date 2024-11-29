import { Elysia, t } from 'elysia'
import {
	getPosts,
	getPostById,
	createPost,
	deletePost,
	updatePost,
} from '@/controllers'
import { authMiddleware } from '@/middlewares'
import {
	createPost as createPostSchema,
	updatePost as updatePostSchema,
	post as postSchema,
	query as querySchema,
	params as paramsSchema,
} from '@/schemas'

export const postRoutes = new Elysia({
	prefix: '/posts',
	detail: {
		tags: ['Posts'],
		responses: {
			'200': {
				description: 'Returns a list of posts',
			},
			'401': {
				description: 'Unauthorized',
			},
		},
	},
})
	.model({ Post: postSchema })
	.use(authMiddleware)
	.guard({
		headers: t.Object({
			authorization: t.Optional(t.String()),
		}),
	})
	.get('/', getPosts, {
		query: querySchema,
	})
	.get('/:id', getPostById, {
		params: paramsSchema,
	})
	.guard({
		headers: t.Object({
			authorization: t.String(),
		}),
	})
	.post('/', createPost, {
		body: createPostSchema,
	})
	.put('/:id', updatePost, {
		params: paramsSchema,
		body: updatePostSchema,
	})
	.delete('/:id', deletePost, {
		params: paramsSchema,
	})
