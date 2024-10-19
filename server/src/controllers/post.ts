import { prisma } from '@/lib'
import { processPostsReactions, uploadToCloudinary } from '@/lib/utils'
import type { RequestParams } from '@/types'
import { error } from 'elysia'

export const getPosts = async ({ userId, query }: RequestParams) => {
	const { cursor, limit = 9 } = query

	const posts = await prisma.post.findMany({
		take: limit + 1,
		cursor: cursor ? { id: cursor } : undefined,
		include: {
			author: {
				select: {
					id: true,
					fullName: true,
					imageUrl: true,
				},
			},
			tags: {
				include: {
					tag: {
						select: {
							name: true,
						},
					},
				},
			},
			reactions: {
				orderBy: { createdAt: 'desc' },
				take: 3,
				select: {
					reactionType: true,
					userId: true,
					createdAt: true,
					user: {
						select: {
							imageUrl: true,
						},
					},
				},
			},
		},
		where: {
			visibility: 'PUBLIC',
			...(userId && { authorId: userId }),
		},
		orderBy: { createdAt: 'desc' } as const,
	})

	return processPostsReactions(posts, userId)
}

export const getPostById = async ({ params: { id }, userId }: RequestParams) => {
	const post = await prisma.post.findUnique({
		where: {
			id,
			OR: [{ visibility: 'PUBLIC' }, { visibility: 'PRIVATE', authorId: userId || '' }],
		},
		include: {
			author: {
				select: {
					id: true,
					fullName: true,
					imageUrl: true,
				},
			},
			tags: {
				include: {
					tag: {
						select: {
							name: true,
						},
					},
				},
			},
			reactions: {
				orderBy: { createdAt: 'desc' },
				take: 3,
				select: {
					reactionType: true,
					userId: true,
					createdAt: true,
					user: {
						select: {
							imageUrl: true,
						},
					},
				},
			},
		},
	})

	if (!post) {
		return error(404, { message: 'Post not found' })
	}

	const [processedPost] = processPostsReactions([post], userId)
	return processedPost
}

export const createPost = async ({ body, userId }: RequestParams) => {
	if (!userId) {
		return error(401, { message: 'Unauthorized' })
	}

	const { title, description, visibility, tags, media } = body
	const response = await uploadToCloudinary(media)
	const post = await prisma.post.create({
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
			author: {
				select: {
					id: true,
					fullName: true,
					imageUrl: true,
				},
			},
			tags: {
				include: {
					tag: {
						select: {
							name: true,
						},
					},
				},
			},
			reactions: {
				orderBy: { createdAt: 'desc' },
				take: 3,
				select: {
					reactionType: true,
					userId: true,
					createdAt: true,
					user: {
						select: {
							imageUrl: true,
						},
					},
				},
			},
		},
	})
	const [processedPost] = processPostsReactions([post], userId)
	return processedPost
}
