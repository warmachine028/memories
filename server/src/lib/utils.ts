import type { ProcessedPostReaction } from '@/types'
import cloudinary from './cloudinary'

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

export const uploadToCloudinary = (base64Image: string) => {
	try {
		return cloudinary.uploader.upload(base64Image, {
			resource_type: 'auto',
			overwrite: true,
		})
	} catch (error) {
		console.error('Error uploading to Cloudinary:', error)
		throw error
	}
}
