import { prisma } from '@/lib'
import type { RequestParams } from '@/types'

export const getPosts = ({ userId }: RequestParams) => {
	if (!userId) {
		return prisma.post.findMany({
			where: { visibility: 'PUBLIC' },
		})
	}
	return prisma.post.findMany({
		where: {
			visibility: 'PUBLIC',
			authorId: userId,
		},
	})
}

export const getPostById = async ({ params: { id }, set, userId }: RequestParams) => {
	const post = await prisma.post.findUnique({ where: { id } })
	if (!post) {
		set.status = 404
		return { message: 'Post not found' }
	}
	if (post.visibility === 'PRIVATE' && post.authorId !== userId) {
		set.status = 401
		return { message: 'Unauthorized' }
	}
	return post
}

export const createPost = async ({ body, userId }: RequestParams) => {
	if (!userId) {
		return { message: 'Unauthorized' }
	}
	return prisma.post.create({ data: { ...body, authorId: userId } })
}
