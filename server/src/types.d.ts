import { t } from 'elysia'
export type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY'

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
	params: {
		id: string
		postId: string
	}
	body: Record
	userId: string | null
	query: Record
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

export type ProcessedPostReaction = {
	userId: string
	user: { imageUrl: string }
	createdAt: Date
	reactionType: ReactionType
}
