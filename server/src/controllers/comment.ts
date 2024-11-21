import { prisma } from '@/lib'
import type { RequestParams } from '@/types'

export const getComments = async ({
	params: { postId },
	query: { cursor, limit },
	userId: currentUserId,
}: RequestParams) => {
	const userId = currentUserId || ''
	const comments = await prisma.comment.findMany({
		include: {
			author: { select: { fullName: true, imageUrl: true } },
			likes: {
				take: 1,
				where: { userId },
			},
		},
		where: { postId },
		orderBy: { createdAt: 'desc' },
		take: (limit || 5) + 1,
		cursor: cursor ? { id: cursor } : undefined,
	})
	const nextCursor = comments.length > limit ? comments[limit].id : undefined
	return {
		comments: comments.slice(0, limit),
		nextCursor,
		total: await prisma.comment.count({ where: { postId } }),
	}
}

export const createComment = async ({
	params: { postId },
	body,
	userId,
}: RequestParams) => {
	if (!userId || !postId) {
		throw new Error('Missing required parameters')
	}
	const { content } = body
	return prisma.comment.create({
		data: { content, postId, authorId: userId },
	})
}

export const deleteComment = async ({
	params: { id },
	userId,
}: RequestParams) => {
	if (!userId) {
		throw new Error('Unauthorized')
	}

	const comment = await prisma.comment.findUnique({
		where: { id, authorId: userId },
	})

	if (!comment) {
		throw new Error('Comment not found')
	}
	return prisma.comment.delete({ where: { id, authorId: userId } })
}
