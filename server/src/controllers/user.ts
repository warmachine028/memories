import { Webhook, WebhookRequiredHeaders } from 'svix'
import type { Event, EventType, User } from '@/types'

const webhookSecret = Bun.env.WEBHOOK_SECRET || ''

type HandleWebhookParams = {
	headers: Record<string, string>
	request: Request
	set: { status: number }
}

export const createUser = async ({ headers, request, set }: HandleWebhookParams) => {
	const payload = await request.json()
	const heads = {
		'svix-id': headers['svix-id'],
		'svix-timestamp': headers['svix-timestamp'],
		'svix-signature': headers['svix-signature'],
	}
	const wh = new Webhook(webhookSecret)
	let event: Event | null = null

	try {
		event = wh.verify(JSON.stringify(payload), heads as WebhookRequiredHeaders) as Event
	} catch (error) {
		set.status = 400
		return { message: (error as Error).message }
	}

	const eventType: EventType = event.type
	if (eventType === 'user.created' || eventType === 'user.updated') {
		const { data } = event
		const user: User = {
			id: data.id,
			firstName: data.first_name,
			lastName: data.last_name,
			email: data.email_addresses[0].email_address,
			bio: data.unsafe_metadata.bio,
			imageUrl: data.image_url,
			createdAt: new Date(data.created_at),
			updatedAt: new Date(data.updated_at),
		}
		console.log(user)
	} else if (eventType === 'user.deleted') {
		console.log(event.data)
	}

	return { message: 'Webhook verified successfully', event }
}
