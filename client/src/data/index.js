import { comments } from './comments'
import { movies } from './movies'
import { posts } from './posts'
import {
	ThumbUp,
	Favorite,
	EmojiEmotions,
	SentimentVeryDissatisfied,
	Mood,
	SentimentDissatisfied,
} from '@mui/icons-material'

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
const reactions = [
	{ icon: ThumbUp, label: 'LIKE', color: '#2196f3' },
	{ icon: Favorite, label: 'LOVE', color: '#e91e63' },
	{ icon: EmojiEmotions, label: 'HAHA', color: '#ffc107' },
	{ icon: SentimentVeryDissatisfied, label: 'SAD', color: '#607d8b' },
	{ icon: Mood, label: 'WOW', color: '#4caf50' },
	{ icon: SentimentDissatisfied, label: 'ANGRY', color: '#ff5722' }
]

export { comments, movies, users, posts, user, reactions }
