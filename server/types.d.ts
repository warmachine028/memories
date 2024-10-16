type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY'
type Visibility = 'PUBLIC' | 'PRIVATE'

type User = {
	id: string
	firstName: string
	lastName: string
	email: string
	bio: string
	imageUrl: string
	createdAt: Date
	updatedAt: Date
}

type Post = {
	id: string
	title: string
	description: string
	imageUrl: string
	visibility: Visibility
	authorId: string
	reactionCounts: ReactionCounts
	createdAt: Date
	updatedAt: Date
}

type Comment = {
	id: string
	content: string
	authorId: string
	postId: string
	createdAt: Date
	updatedAt: Date
}

type PostReaction = {
	id: string
	userId: string
	postId: string
	reactionType: ReactionType
	createdAt: Date
}

type CommentLike = {
	id: string
	userId: string
	commentId: string
	createdAt: Date
}

type ReactionCounts = {
	likes: number
	love: number
	haha: number
	wow: number
	sad: number
	angry: number
}

type PostTag = {
	id: string
	postId: string
	tagId: string
}

type Tag = {
	id: string
	name: string
}

