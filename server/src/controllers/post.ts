import { prisma } from '@/lib'
import { deleteFromCloudinary, getPublicId, processPostsReactions, uploadToCloudinary } from '@/lib/utils'
import type { RequestParams } from '@/types'
import { error } from 'elysia'

export const getPosts = async ({ query: { cursor, limit }, userId: currentUserId }: RequestParams) => {
	const userId = currentUserId || ''
	const posts = await prisma.post.findMany({
		include: {
			author: { select: { fullName: true, imageUrl: true } },
			tags: { select: { tag: { select: { name: true } } } },
			reactions: { take: 1, where: { userId }, select: { reactionType: true } },
		},
		orderBy: { createdAt: 'desc' },
		take: (limit || 9) + 1,
		where: {
			OR: [{ visibility: 'PUBLIC' }, { visibility: 'PRIVATE', authorId: userId }],
		},
		cursor: cursor ? { id: cursor } : undefined,
	})
	const nextCursor = posts.length > limit ? posts[limit].id : undefined
	return { posts: posts.slice(0, limit), nextCursor, total: await prisma.post.count() }
}

export const getPostById = async ({ params: { id }, userId: currentUserId }: RequestParams) => {
	const userId = currentUserId || ''
	const post = await prisma.post.findUnique({
		where: {
			id,
			OR: [{ visibility: 'PUBLIC' }, { visibility: 'PRIVATE', authorId: userId }],
		},
		include: {
			author: { select: { fullName: true, imageUrl: true } },
			tags: { include: { tag: { select: { name: true } } } },
			reactions: { take: 1, where: { userId }, select: { reactionType: true } },
		},
	})

	if (!post) {
		return error(404, { message: 'Post not found' })
	}

	const [processedPost] = processPostsReactions([post], userId)
	return processedPost
}

export const createPost = async ({ body, userId }: RequestParams) => {
	console.log(userId, body)
	if (!userId) {
		return error(401, { message: 'Unauthorized' })
	}
	const { title, description, visibility, tags, media } = body
	const response = await uploadToCloudinary(media)
	return prisma.post.create({
		data: {
			title,
			description,
			imageUrl: response.secure_url,
			visibility,
			author: { connect: { id: userId } },
			tags: {
				create: tags.map((tagName: string) => ({
					tag: {
						connectOrCreate: {
							where: { name: tagName },
							create: { name: tagName },
						},
					},
				})),
			},
		},
		include: {
			author: { select: { fullName: true, imageUrl: true } },
			tags: { include: { tag: { select: { name: true } } } },
			reactions: { take: 1, where: { userId }, select: { reactionType: true } },
		},
	})
}

export const deletePost = async ({ params: { id }, userId }: RequestParams) => {
	if (!userId) {
		return error(401, { message: 'Unauthorized' })
	}
	const post = await prisma.post.delete({
		where: { id, authorId: userId },
		select: {
			imageUrl: true,
		},
	})
	if (!post.imageUrl) {
		return error(404, { message: 'Post not found' })
	}
	await deleteFromCloudinary(getPublicId(post.imageUrl) as string)
	return { message: 'Post deleted successfully' }
}

export const updatePost = async ({ params: { id }, body, userId }: RequestParams) => {
	if (!userId) {
		return error(401, { message: 'Unauthorized' })
	}
	const { title, description, visibility, tags, media, imageUrl } = body
	const response = await uploadToCloudinary(media, getPublicId(imageUrl))
	return prisma.post.update({
		where: { id, authorId: userId },
		data: {
			title,
			description,
			imageUrl: response.secure_url,
			visibility,
			tags: {
				set: tags.map((tagName: string) => ({
					tag: {
						connectOrCreate: {
							where: { name: tagName },
							create: { name: tagName },
						},
					},
				})),
			},
		},
		include: {
			author: { select: { fullName: true, imageUrl: true } },
			tags: { include: { tag: { select: { name: true } } } },
			reactions: { take: 1, where: { userId }, select: { reactionType: true } },
		},
	})
}
