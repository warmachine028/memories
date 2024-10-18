
import type { ProcessedPostReaction } from '@/types'

// Helper function to process reactions
export const processPostsReactions = (posts: any[], userId: string | null) => {
	return posts.map((post) => {
		let currentUserReaction: ProcessedPostReaction | null = null
		let otherReactions: ProcessedPostReaction[] = []

		post.reactions.forEach((reaction: ProcessedPostReaction) => {
			if (reaction.userId === userId) {
				currentUserReaction = reaction
			} else {
				otherReactions.push(reaction)
			}
		})

		const finalReactions = currentUserReaction ? [currentUserReaction, ...otherReactions.slice(0, 2)] : otherReactions.slice(0, 3)

		return {
			...post,
			currentUserReaction,
			recentReactions: finalReactions.map((r) => ({
				imageUrl: r.user.imageUrl,
				createdAt: r.createdAt,
			})),
		}
	})
}
