import { t } from 'elysia'
import { Visibility } from '@prisma/client'

const postBase = {
	title: t.String(),
	description: t.String(),
	visibility: t.Optional(t.Enum(Visibility)),
}

const tagBase = t.Object({
	tag: t.Object({ name: t.String() }),
})

const paginationQuery = t.Object({
	cursor: t.Optional(t.String()),
	limit: t.Optional(t.Number()),
})

const idParam = t.Object({ id: t.String() })

// Export schemas
export const createPost = t.Object({
	...postBase,
	media: t.String(),
	tags: t.Array(t.String()),
})

export const updatePost = t.Object({
	...postBase,
	media: t.String(),
	tags: t.Array(t.String()),
	imageUrl: t.String(),
})

export const post = t.Object({
	id: t.String(),
	authorId: t.String(),
	...postBase,
	imageUrl: t.String(),
	reactionCount: t.Number(),
	tags: t.Array(tagBase),
	createdAt: t.Date(),
	updatedAt: t.Date(),
})

export const query = t.Optional(paginationQuery)
export const params = idParam
