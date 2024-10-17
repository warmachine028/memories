import { Elysia } from 'elysia'

export const commentRoutes = new Elysia({ prefix: '/comments' }) //
	.get('/', ({ query: { postId } }: { query: { postId: string } }) => {
		return [
			{
				id: '1',
				postId: '1',
				authorId: '1',
				content: 'Hello',
				likeCount: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: '2',
				postId: '1',
				authorId: '2',
				content: 'Hello',
				likeCount: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		].filter((comment) => comment.postId === postId)
	})
