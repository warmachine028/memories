import { Elysia, t } from 'elysia'
import { Webhook, WebhookRequiredHeaders } from 'svix'

const handleWebhook = async ({ headers, request, set }: { headers: Record<string, string>; request: Request; set: { status: number } }) => {
    console.log("first")
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
		console.log(event.data)
	}
	// Add a return statement here
	return { message: 'Webhook verified successfully', event }
}

type EventType = 'user.created' | 'user.updated' | 'user.deleted' | 'user.createdAtEdge'
type Event = {
	data: Record<string, string | number>
	object: 'event'
	type: EventType
}
const webhookSecret = Bun.env.WEBHOOK_SECRET || ''

export const webhookRoutes = new Elysia({ prefix: '/webhook' })
	.get('/', handleWebhook, {
		headers: t.Object({
			'svix-id': t.String(),
			'svix-timestamp': t.String(),
			'svix-signature': t.String(),
		}),
	})
	.post('/', handleWebhook, {
		headers: t.Object({
			'svix-id': t.String(),
			'svix-timestamp': t.String(),
			'svix-signature': t.String(),
		}),
	})
	.put('/', handleWebhook, {
		headers: t.Object({
			'svix-id': t.String(),
			'svix-timestamp': t.String(),
			'svix-signature': t.String(),
		}),
	})
