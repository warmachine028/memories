export type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY'
export type Visibility = 'PUBLIC' | 'PRIVATE'

type EventEmailAddress = {
	email_address: string
	id: string
	linked_to: any[]
	object: 'email_address'
	reserved: boolean
	verification: {
		attempts: null | number
		expire_at: null | string
		status: 'verified' | string
		strategy: 'admin' | string
	}
}
export type RequestParams = {
	headers: Record<string, string>
	request: Request
	set: { status: number }
	params: { id: string }
	body: Record
	userId: string | null
}
export type EventType = 'user.created' | 'user.updated' | 'user.deleted' | 'user.createdAtEdge'
export type Event = {
	data: {
		id: string
		first_name: string
		last_name: null | string
		email_addresses: EventEmailAddress[]
		unsafe_metadata: Record<string, any>
		image_url: string
		created_at: number
		updated_at: number
	}
	object: 'event'
	timestamp: number
	type: EventType
}
export type User = {
	id: string
	firstName: string
	lastName: null | string
	email: string
	bio: null | string
	imageUrl: string
}

export type Post = {
	id: string
	authorId: string
	title: string
	description: string
	imageUrl: string
	visibility: Visibility
	reactionCount: number
	createdAt: Date
	updatedAt: Date
}

export type Comment = {
	id: string
	postId: string
	authorId: string
	content: string
	likeCount: number
	createdAt: Date
	updatedAt: Date
}

export type PostReaction = {
	id: string
	userId: string
	postId: string
	reactionType: ReactionType
	createdAt: Date
}

export type CommentLike = {
	id: string
	userId: string
	commentId: string
	createdAt: Date
}

export type ReactionCounts = {
	likes: number
	love: number
	haha: number
	wow: number
	sad: number
	angry: number
}

export type PostTag = {
	id: string
	postId: string
	tagId: string
}

type Tag = {
	id: string
	name: string
}
