import { Elysia, t } from 'elysia'
import { getPosts, getPostById, createPost } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { Visibility } from '@prisma/client'
import { type RequestParams } from '@/types'

export const postRoutes = new Elysia({ prefix: '/posts' })
	.use(authMiddleware)
	.guard({
		headers: t.Object({
			authorization: t.Optional(t.String()),
		}),
	})
	.get('/', getPosts, {
		query: t.Optional(
			t.Object({
				cursor: t.String(),
				limit: t.Optional(t.Number()),
			})
		),
	})
	.get('/:id', getPostById, {
		params: t.Object({
			id: t.String(),
		}),
	})
	.guard({
		headers: t.Object({
			authorization: t.String(),
		}),
	})
	.post('/', createPost, {
		body: t.Object({
			title: t.String(),
			description: t.String(),
			imageUrl: t.String(),
			visibility: t.Enum(Visibility),
			tags: t.Array(t.String()),
		}),
	})
	.patch(
		'/:id',
		({ params: { id }, body, userId }: RequestParams) => {
			return {
				id,
				title: 'Hello',
				description: 'Hello',
				imageUrl: 'Hello',
				visibility: Visibility.PUBLIC,
				tags: ['Hello'],
			}
		},
		{
			body: t.Object({
				title: t.String(),
				description: t.String(),
				imageUrl: t.String(),
				visibility: t.Enum(Visibility),
				tags: t.Array(t.String()),
			}),
		}
	)
	.delete('/:id', ({ params: { id }, userId }: RequestParams) => {
		if (userId !== '1') {
			throw new Error('Unauthorized')
		}
		return {
			id,
		}
	})
