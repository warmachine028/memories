import { Elysia } from 'elysia'

const posts: Post[] = [
	{
		id: '1',
		title: 'Hello World',
		description: 'This is a test post',
		imageUrl: 'https://picsum.photos/200/300',
		visibility: 'PUBLIC',
		authorId: '1',
		reactionCounts: {
			likes: 0,
			love: 0,
			haha: 0,
			wow: 0,
			sad: 0,
			angry: 0,
		},
		createdAt: new Date('2024-01-14'),
		updatedAt: new Date('2024-02-14'),
	},
	{
		id: '2',
		title: 'Hello World',
		description: 'This is a test post',
		imageUrl: 'https://picsum.photos/200/300',
		visibility: 'PUBLIC',
		authorId: '2',
		reactionCounts: {
			likes: 0,
			love: 0,
			haha: 0,
			wow: 0,
			sad: 0,
			angry: 0,
		},
		createdAt: new Date('2024-02-14'),
		updatedAt: new Date('2024-02-14'),
	},
]

export const getPosts = () => posts
export const getPostById = ({ params: { id }, set }: { params: { id: string }; set: { status: number } }) => {
	const post = posts.find((post) => post.id === id)
	if (!post) {
		set.status = 404
		return { message: 'Post not found' }
	}
	return post
}
export const createPost = ({ body }: { body: Post }) => posts.push(body)