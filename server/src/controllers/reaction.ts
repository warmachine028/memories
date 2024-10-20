import { prisma } from '@/lib'
import { processPostsReactions } from '@/lib/utils'
import type { RequestParams } from '@/types'
import type { ReactionType } from '@prisma/client'

export const react = async ({ params: { postId }, body, userId }: RequestParams) => {
	if (!userId) {
		throw new Error('Unauthorized')
	}

	const { reactionType }: { reactionType: ReactionType } = body

	// Check if the post exists and is accessible to the user
	const post = await prisma.post.findFirst({
		where: {
			id: postId,
			OR: [{ visibility: 'PUBLIC' }, { visibility: 'PRIVATE', authorId: userId }],
		},
	})

	if (!post) {
		throw new Error('Post not found or not accessible')
	}

	// Check if the user has already reacted to this post
	const existingReaction = await prisma.postReaction.findUnique({
		where: {
			userId_postId: {
				userId,
				postId,
			},
		},
	})

	let reaction

	if (existingReaction) {
		if (existingReaction.reactionType === reactionType) {
			// If the reaction is the same, remove it
			await prisma.postReaction.delete({
				where: { id: existingReaction.id },
			})
			reaction = null
		} else {
			// If the reaction is different, update it
			reaction = await prisma.postReaction.update({
				where: { id: existingReaction.id },
				data: { reactionType },
			})
		}
	} else {
		// If no existing reaction, create a new one
		reaction = await prisma.postReaction.create({
			data: {
				reactionType,
				user: { connect: { id: userId } },
				post: { connect: { id: postId } },
			},
		})
	}

	// Fetch the updated post with reactions
	const updatedPost = await prisma.post.findUnique({
		where: { id: postId },
		include: {
			reactions: {
				orderBy: { createdAt: 'desc' },
				take: 3,
				select: {
					reactionType: true,
					userId: true,
					createdAt: true,
					user: {
						select: {
							imageUrl: true,
						},
					},
				},
			},
		},
	})

	if (!updatedPost) {
		throw new Error('Failed to fetch updated post')
	}

	const [processedPost] = processPostsReactions([updatedPost], userId)
	return processedPost
}
