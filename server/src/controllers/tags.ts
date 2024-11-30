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
