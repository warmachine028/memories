import { prisma } from '@/lib'
import { RequestParams } from '@/types'

export const deleteUnusedTags = () =>
	prisma.$transaction(async (tx) => {
		const unusedTags = await tx.tag.findMany({
			where: { posts: { none: {} } },
			select: { id: true, name: true },
		})

		await tx.tag.deleteMany({
			where: { id: { in: unusedTags.map((tag) => tag.id) } },
		})
		return {
			count: unusedTags.length,
			tags: unusedTags.map((tag) => tag.name),
		}
	})

export const getTrendingTags = async () => {
	const tags = await prisma.tag.findMany({
		select: { name: true, _count: { select: { posts: true } } },
		orderBy: [{ posts: { _count: 'desc' } }, { name: 'asc' }],
		take: 5,
	})
	return tags.map((tag) => ({
		hashtag: tag.name,
		count: tag._count.posts,
	}))
}

export const searchTags = async ({ query: { q } }: RequestParams) => {
	const tags = await prisma.tag.findMany({
		select: { name: true },
		where: { name: { contains: q, mode: 'insensitive' } },
		orderBy: { name: 'asc' },
	})
	return tags.map((tag) => tag.name)
}

export const searchPostsByTag = async ({
	params: { tag },
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
			AND: [
				{
					OR: [
						{ visibility: 'PUBLIC' },
						{ visibility: 'PRIVATE', authorId: userId },
					],
				},
				{
					tags: {
						some: {
							tag: {
								name: {
									contains: tag,
									mode: 'insensitive',
								},
							},
						},
					},
				},
			],
		},
		orderBy: { createdAt: 'desc' },
		take: (limit || 9) + 1,
		cursor: cursor ? { id: cursor } : undefined,
	})
	const nextCursor = posts.length > limit ? posts[limit].id : undefined
	return {
		posts: posts.slice(0, limit).map((post) => ({
			...post,
			tags: post.tags.map((tag) => tag.tag.name),
		})),
		nextCursor,
		total: await prisma.post.count(),
	}
}
