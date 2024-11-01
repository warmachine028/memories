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
	return prisma.$transaction(
		async (tx) => {
			const post = await tx.post.findUnique({
				where: { id: postId },
				select: { id: true },
			})

			if (!post) {
				throw new Error('Post not found')
			}

			const existingReaction = await tx.postReaction.findUnique({
				where: {
					userId_postId: { userId, postId },
				},
			})

			if (existingReaction) {
				// If reaction type is same, no update needed
				if (existingReaction.reactionType === reactionType) {
					return existingReaction
				}

				// Update existing reaction
				return await tx.postReaction.update({
					where: { id: existingReaction.id },
					data: { reactionType },
				})
			}

			// Create new reaction
			const newReaction = await tx.postReaction.create({
				data: {
					userId,
					postId,
					reactionType,
				},
			})

			// Update post reaction count
			await tx.post.update({
				where: { id: postId },
				data: {
					reactionCount: {
						increment: 1,
					},
				},
			})

			return newReaction
		},
		{
			isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
			timeout: 5000, // 5 second timeout
		}
	)
}

export const unreact = async ({
	params: { postId },
	userId,
}: RequestParams) => {
	if (!userId || !postId) {
		throw new Error('Missing required parameters')
	}

	return prisma.$transaction(
		async (tx) => {
			const post = await tx.post.findUnique({
				where: { id: postId },
				select: { id: true },
			})

			if (!post) {
				throw new Error('Post not found')
			}

			try {
				// Delete reaction
				const deletedReaction = await tx.postReaction.delete({
					where: { userId_postId: { userId, postId } },
				})

				// Update post reaction count
				await tx.post.update({
					where: { id: postId },
					data: {
						reactionCount: {
							decrement: 1,
						},
					},
				})

				return deletedReaction
			} catch (error) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					if (error.code === 'P2025') {
						// Record not found
						throw new Error('Reaction not found')
					}
				}
				throw error
			}
		},
		{
			isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
			timeout: 5000,
		}
	)
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
