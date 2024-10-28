import { comments } from './comments'
import { movies } from './movies'
import { posts } from './posts'

import { default as users } from './users'

export const pages = 2
export const page1 = comments.slice(0, 9)
export const page2 = comments.slice(10)
// Mock user data (replace with actual data fetching logic)
const user = {
	metrics: {
		postsCount: 42,
		longestPostWords: 1500,
		longestPostId: 'abc123',
		likesReceived: 256,
		commentsReceived: 128,
		privatePostsCount: 5
	}
}

export { comments, movies, users, posts, user }
