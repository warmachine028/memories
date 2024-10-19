import { Webhook, WebhookRequiredHeaders } from 'svix'
import type { Event, EventType, RequestParams } from '@/types'
import { prisma } from '@/lib'

export const handleWebhook = async ({ headers, request, set }: RequestParams) => {
	const payload = await request.json()
	const heads = {
		'svix-id': headers['svix-id'],
		'svix-timestamp': headers['svix-timestamp'],
		'svix-signature': headers['svix-signature'],
	}
	const wh = new Webhook(Bun.env.CLERK_WEBHOOK_SECRET as string)
	let event: Event | null = null

	try {
		event = wh.verify(JSON.stringify(payload), heads as WebhookRequiredHeaders) as Event
	} catch (error) {
		set.status = 400
		return { message: (error as Error).message }
	}

	const eventType: EventType = event.type

	try {
		switch (eventType) {
			case 'user.created':
			case 'user.updated':
			case 'user.createdAtEdge':
				await handleUserCreatedOrUpdated(event)
				break
			case 'user.deleted':
				await handleUserDeleted(event)
				break
			default:
				console.log(`Unhandled event type: ${eventType}`)
		}
	} catch (error) {
		console.error('Error processing webhook:', error)
		set.status = 500
		return { message: 'Error processing webhook', error: (error as Error).message }
	}

	return { message: 'Webhook processed successfully', event }
}

async function handleUserCreatedOrUpdated(event: Event) {
	const { data } = event
	const user = {
		id: data.id,
		firstName: data.first_name,
		lastName: data.last_name,
		email: data.email_addresses[0].email_address,
		bio: data.unsafe_metadata.bio,
		imageUrl: data.image_url,
	}

	await prisma.user.upsert({
		where: { id: user.id },
		update: user,
		create: user,
	})

	console.log(`User ${event.type}:`, user)
}

async function handleUserDeleted(event: Event) {
	const userId = event.data.id
	await prisma.user.delete({ where: { id: userId } })
	console.log('User deleted:', userId)
}

export const getUsers = async () => prisma.user.findMany()
export const getUser = ({ params: { id } }: RequestParams) => prisma.user.findUnique({ where: { id } })
