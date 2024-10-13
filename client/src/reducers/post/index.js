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
			await delay(2000)
			const response = await axios.get(`https://dummyjson.com/posts?limit=10&skip=${skip}`)
			return response.data
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
