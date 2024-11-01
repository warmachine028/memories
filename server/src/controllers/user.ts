import { Webhook, WebhookRequiredHeaders } from 'svix'
import type { Event, EventType, RequestParams } from '@/types'
import { prisma } from '@/lib'
import { error } from 'elysia'
import { Prisma } from '@prisma/client'
export const handleWebhook = async ({
	headers,
	request,
	set,
}: RequestParams) => {
	const payload = await request.json()
	const heads = {
		'svix-id': headers['svix-id'],
		'svix-timestamp': headers['svix-timestamp'],
		'svix-signature': headers['svix-signature'],
	}
	const wh = new Webhook(Bun.env.CLERK_WEBHOOK_SECRET as string)
	let event: Event | null = null

	try {
		event = wh.verify(
			JSON.stringify(payload),
			heads as WebhookRequiredHeaders
		) as Event
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
				console.error(`Unhandled event type: ${eventType}`)
		}
	} catch (error) {
		console.error('Error processing webhook:', error)
		set.status = 500
		return {
			message: 'Error processing webhook',
			error: (error as Error).message,
		}
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
}

async function handleUserDeleted(event: Event) {
	const userId = event.data.id
	await prisma.user.delete({ where: { id: userId } })
}

export const getUsers = async () => prisma.user.findMany()
export const getUser = async ({ params: { id } }: RequestParams) => {
	const user = await prisma.user.findUnique({ where: { id } })
	if (!user) {
		return error(404, { message: 'User not found' })
	}
	return user
}

export const getUserStats = async ({ params: { id } }: RequestParams) => {
	// Validate input
	const user = await prisma.user.findUnique({ where: { id } })
	if (!user) {
		return error(404, { message: 'User not found' })
	}

	const posts = await prisma.post.count({
		where: { authorId: id },
	})

	const privatePosts = await prisma.post.count({
		where: { authorId: id, visibility: 'PRIVATE' },
	})

	const reactionsReceived = await prisma.post.aggregate({
		where: { authorId: id },
		_sum: { reactionCount: true },
	})

	const commentsReceived = await prisma.comment.count({
		where: { post: { authorId: id } },
	})
	try {
		const result = await prisma.$queryRaw<{ id: string; words: number }[]>`
			SELECT 
				id,
				array_length(
					regexp_split_to_array(
						description, '\\s+'
					),
					1
				) words
			FROM posts
			WHERE "authorId" = ${id}
			ORDER BY words DESC, "updatedAt" DESC
			LIMIT 1
	`
		return {
			posts,
			privatePosts,
			reactionsReceived: reactionsReceived._sum.reactionCount,
			commentsReceived,
			longestPost: result[0],
		}
	} catch (error) {
		console.error('Error fetching longest post:', error)
	}
}
