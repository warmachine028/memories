import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	posts: [],
	error: null,
	loading: false,
	hasMore: true
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getPosts = createAsyncThunk(
	'post/getPosts', // prefix
	async (_, { getState, rejectWithValue }) => {
		try {
			const { posts } = getState().posts
			const skip = posts.length
			const response = await axios.get(`https://dummyjson.com/posts?limit=10&skip=${skip}`)
			const postsWithImages = await Promise.all(
				response.data.posts.map(async (post) => {
					try {
						const imageResponse = await axios.get('https://picsum.photos/800/600', {
							responseType: 'blob'
						})
						const imageUrl = URL.createObjectURL(imageResponse.data)
						return { ...post, imageUrl }
					} catch (error) {
						console.error(`Failed to fetch image for post ${post.id}:`, error)
						return post // Return the post without an image if fetching fails
					}
				})
			)
			return { posts: postsWithImages }
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const slice = createSlice({
	name: 'post',
	initialState,

	extraReducers: (builder) => {
		builder
			.addCase(getPosts.pending, (state) => {
				state.loading = true
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.loading = false
				state.posts = [...state.posts, ...action.payload.posts]
				state.hasMore = action.payload.posts.length === 10
				state.error = null
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Something went wrong'
			})
	}
})

export default slice.reducer
