import { prisma } from '@/lib'
import type { RequestParams } from '@/types'
import type { ReactionType } from '@prisma/client'
import { Prisma } from '@prisma/client'

export const react = async ({
	params: { postId },
	body,
	userId,
}: RequestParams) => {
	if (!userId || !postId) {
		throw new Error('Missing required parameters')
	}

	// Validate reaction type at runtime
	const { reactionType }: { reactionType: ReactionType } = body
	const post = await prisma.post.findUnique({
		where: { id: postId },
		select: { id: true },
	})
	if (!post) {
		throw new Error('Post not found')
	}
	const existingReaction = await prisma.postReaction.findUnique({
		where: {
			userId_postId: { userId, postId },
		},
	})
	return prisma.$transaction([
		...(existingReaction
			? [
					prisma.postReaction.update({
						where: { userId_postId: { userId, postId } },
						data: { reactionType },
					}),
			  ]
			: [
					prisma.postReaction.create({
						data: {
							userId,
							postId,
							reactionType,
						},
					}),
					prisma.post.update({
						where: { id: postId },
						data: {
							reactionCount: {
								increment: 1,
							},
						},
					}),
			  ]),
	])
}

export const unreact = async ({
	params: { postId },
	userId,
}: RequestParams) => {
	if (!userId || !postId) {
		throw new Error('Missing required parameters')
	}
	const post = await prisma.post.findUnique({
		where: { id: postId },
		select: { id: true },
	})
	if (!post) {
		throw new Error('Post not found')
	}

	return prisma.$transaction([
		prisma.postReaction.delete({
			where: { userId_postId: { userId, postId } },
		}),
		prisma.post.update({
			where: { id: postId },
			data: {
				reactionCount: {
					decrement: 1,
				},
			},
		}),
	])
}

export const reactions = async ({
	params: { postId },
	userId: currentUserId,
}: RequestParams) => {
	const userId = currentUserId || ''
	if (!postId) {
		throw new Error('Missing required parameters')
	}
	const post = await prisma.post.findUnique({
		where: { id: postId },
		select: {
			reactions: {
				where: { userId },
				select: { reactionType: true },
			},
			reactionCount: true,
		},
	})
	if (!post) {
		throw new Error('Post not found')
	}
	return {
		reactionCount: post.reactionCount,
		reactionType: post.reactions[0]?.reactionType,
	}
}

export const getReaction = async ({
	params: { postId },
	query: { page = '1', limit = '10' },
}: RequestParams) => {
	if (!postId) {
		throw new Error('Missing post ID')
	}

	const pageNum = Math.max(1, parseInt(page as string))
	const limitNum = Math.min(50, Math.max(1, parseInt(limit as string)))
	const skip = (pageNum - 1) * limitNum

	return prisma.$transaction(
		async (tx) => {
			const [reactions, total] = await Promise.all([
				tx.postReaction.findMany({
					where: { postId },
					include: {
						user: {
							select: {
								id: true,
								fullName: true,
								imageUrl: true,
							},
						},
					},
					skip,
					take: limitNum,
					orderBy: {
						createdAt: 'desc',
					},
				}),
				tx.postReaction.count({
					where: { postId },
				}),
			])

			return {
				reactions,
				pagination: {
					page: pageNum,
					limit: limitNum,
					total,
					pages: Math.ceil(total / limitNum),
				},
			}
		},
		{
			isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
			timeout: 5000,
		}
	)
}

export const getTop3Reactors = async ({
	params: { postId },
}: RequestParams) => {
	if (!postId) {
		throw new Error('Missing post ID')
	}
	return prisma.postReaction.findMany({
		where: { postId },
		select: {
			user: {
				select: {
					id: true,
					fullName: true,
					imageUrl: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 3,
	})
}

export const updateAllReactionCounts = async () => {
	// Get all unique posts with their reaction counts
	const postReactionCounts = await prisma.postReaction.groupBy({
		by: ['postId'],
		_count: {
			postId: true,
		},
	})

	// Batch update posts with their reaction counts
	const updatePromises = postReactionCounts.map((reaction) =>
		prisma.post.update({
			where: { id: reaction.postId },
			data: {
				reactionCount: reaction._count.postId,
			},
		})
	)

	// If there are no reactions, set reactionCount to 0 for all posts
	const zeroReactionPosts = await prisma.post.findMany({
		where: {
			NOT: {
				id: { in: postReactionCounts.map((r) => r.postId) },
			},
		},
	})

	const zeroReactionUpdatePromises = zeroReactionPosts.map((post) =>
		prisma.post.update({
			where: { id: post.id },
			data: {
				reactionCount: 0,
			},
		})
	)

	// Execute all updates
	await Promise.all([...updatePromises, ...zeroReactionUpdatePromises])

	console.log(
		`Updated reaction counts for ${postReactionCounts.length} posts with reactions`
	)
	console.log(
		`Set reaction count to 0 for ${zeroReactionPosts.length} posts without reactions`
	)
}

export const like = async ({
	params: { commentId },
	userId,
}: RequestParams) => {
	if (!userId || !commentId) {
		throw new Error('Missing required parameters')
	}
	const comment = await prisma.comment.findUnique({
		where: { id: commentId },
		select: { id: true },
	})
	if (!comment) {
		throw new Error('Comment not found')
	}
	const liked = await prisma.commentLike.findUnique({
		where: {
			userId_commentId: { userId, commentId },
		},
	})
	if (liked) {
		return
	}
	return prisma.$transaction([
		prisma.commentLike.create({
			data: { userId, commentId },
		}),
		prisma.comment.update({
			where: { id: commentId },
			data: {
				likeCount: {
					increment: 1,
				},
			},
		}),
	])
}

export const unlike = async ({
	params: { commentId },
	userId,
}: RequestParams) => {
	if (!userId || !commentId) {
		throw new Error('Missing required parameters')
	}
	const comment = await prisma.comment.findUnique({
		where: { id: commentId },
		select: { id: true },
	})
	if (!comment) {
		throw new Error('Comment not found')
	}

	return prisma.$transaction([
		prisma.commentLike.delete({
			where: { userId_commentId: { userId, commentId } },
		}),
		prisma.comment.update({
			where: { id: commentId },
			data: {
				likeCount: {
					decrement: 1,
				},
			},
		}),
	])
}

export const likes = async ({
	params: { commentId },
	userId,
}: RequestParams) => {
	if (!commentId) {
		throw new Error('Missing required parameters')
	}

	const comment = await prisma.comment.findUnique({
		where: { id: commentId },
		select: {
			likes: {
				where: { userId: userId ?? '' },
				select: { userId: true },
			},
			likeCount: true,
		},
	})
	if (!comment) {
		throw new Error('Comment not found')
	}
	return {
		likeCount: comment.likeCount,
		isLiked: !!comment.likes.length,
	}
}
