import { prisma } from '@/lib'
import {
	deleteFromCloudinary,
	getPublicId,
	uploadToCloudinary,
} from '@/lib/utils'
import type { RequestParams } from '@/types'
import { error } from 'elysia'

export const getPosts = async ({
	query: { cursor, limit },
	userId: currentUserId,
}: RequestParams) => {
	const userId = currentUserId || ''
	const posts = await prisma.post.findMany({
		include: {
			author: { select: { fullName: true, imageUrl: true } },
			tags: { select: { tag: { select: { name: true } } } },
		},
		where: {
			OR: [
				{ visibility: 'PUBLIC' },
				{ visibility: 'PRIVATE', authorId: userId },
			],
		},
		orderBy: { createdAt: 'desc' },
		take: (limit || 9) + 1,
		cursor: cursor ? { id: cursor } : undefined,
	})
	const nextCursor = posts.length > limit ? posts[limit].id : undefined
	return {
		posts: posts.slice(0, limit),
		nextCursor,
		total: await prisma.post.count(),
	}
}

export const getPostById = async ({
	params: { id },
	userId: currentUserId,
}: RequestParams) => {
	const userId = currentUserId || ''
	const post = await prisma.post.findUnique({
		include: {
			author: { select: { fullName: true, imageUrl: true } },
			tags: { select: { tag: { select: { name: true } } } },
			reactions: {
				take: 1,
				where: { userId },
				select: { reactionType: true },
			},
		},
		where: {
			id,
			OR: [
				{ visibility: 'PUBLIC' },
				{ visibility: 'PRIVATE', authorId: userId },
			],
		},
	})

	if (!post) {
		return error(404, { message: 'Post not found' })
	}

	return post
}

export const createPost = async ({ body, userId }: RequestParams) => {
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
				create: tags.map((name: string) => ({
					tag: {
						connectOrCreate: {
							where: { name },
							create: { name },
						},
					},
				})),
			},
		},
		include: {
			author: { select: { fullName: true, imageUrl: true } },
			tags: { include: { tag: { select: { name: true } } } },
			reactions: {
				take: 1,
				where: { userId },
				select: { reactionType: true },
			},
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

export const updatePost = async ({
	params: { id },
	body,
	userId,
}: RequestParams) => {
	if (!userId) {
		return error(401, { message: 'Unauthorized' })
	}
	body.tags = body.tags.map(
		({ tag: { name } }: { tag: { name: string } }) => name
	)
	const { title, description, visibility, tags, media, imageUrl } = body

	// STEP 1: Upload the new image to Cloudinary
	// STEP 2: Delete all the tags from PostTags
	// STEP 3: Create the new tag relations in PostTag
	try {
		const response = await uploadToCloudinary(media, getPublicId(imageUrl))
		return await prisma.$transaction(async (tx) => {
			await tx.postTag.deleteMany({ where: { postId: id } })
			await tx.post.update({
				where: { id, authorId: userId },
				data: {
					title,
					description,
					imageUrl: response.secure_url,
					visibility,
					tags: {
						create: tags.map((name: string) => ({
							tag: {
								connectOrCreate: {
									where: { name },
									create: { name },
								},
							},
						})),
					},
				},
				include: {
					author: { select: { fullName: true, imageUrl: true } },
					tags: { include: { tag: { select: { name: true } } } },
				},
			})
		})
	} catch (error) {
		console.error(error)
	}
}
