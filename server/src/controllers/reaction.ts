import { prisma } from '@/lib'
import { processPostsReactions } from '@/lib/utils'
import type { RequestParams } from '@/types'
import type { ReactionType } from '@prisma/client'

/**
 * React to a post or update an existing reaction
 * @param params - The request parameters (postId)
 * @param body - The request body (reactionType)
 * @param userId - The user ID
 * @returns The reaction
 */

export const react = async ({
	params: { postId },
	body,
	userId,
}: RequestParams) => {
	if (!userId) {
		throw new Error('Unauthorized')
	}
	const { reactionType }: { reactionType: ReactionType } = body
	return prisma.$transaction(async (tx) => {
		const existingReaction = await tx.postReaction.findUnique({
			where: {
				userId_postId: { userId, postId },
			},
		})

		if (existingReaction) {
			// If the reaction is the same, return the existing reaction
			if (existingReaction.reactionType === reactionType) {
				return existingReaction
			}

			// If the reaction is different, update the reaction
			const updatedReaction = await tx.postReaction.update({
				where: { id: existingReaction.id },
				data: { reactionType },
			})

			return updatedReaction
		}

		// If the reaction is new, create it
		const newReaction = await tx.postReaction.create({
			data: { userId, postId, reactionType },
		})

		await tx.post.update({
			where: { id: postId },
			data: { reactionCount: { increment: 1 } },
		})

		return newReaction
	})
}

/**
 * Unreact to a post
 * @param params - The request parameters (postId)
 * @param userId - The user ID
 * @returns The deleted reaction
 */
export const unreact = async ({
	params: { postId },
	userId,
}: RequestParams) => {
	if (!userId) {
		throw new Error('Unauthorized')
	}

	return prisma.$transaction(async (tx) => {
		const deletedReaction = await tx.postReaction.delete({
			where: { id: postId },
		})

		await tx.post.update({
			where: { id: postId },
			data: { reactionCount: { decrement: 1 } },
		})

		return deletedReaction
	})
}

export const getReaction = ({ params: { postId } }: RequestParams) => {
	return prisma.postReaction.findMany({
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
	})
}
