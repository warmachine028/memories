import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchPosts } from '@/api'
import { posts } from '@/data'

const initialState = {
	loading: false,
	posts,
	numberOfPages: null,
	error: null
}

export const getPosts = createAsyncThunk(
	'post/getPosts', // prefix
	async (formData, thunkAPI) => {
		try {
			const { data } = await fetchPosts(formData)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
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
				state.posts = action.payload.data
				state.numberOfPages = action.payload.numberOfPages
				state.error = null
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.loading = false
				state.posts = []
				state.error = action.payload
			})
	}
})

export default slice.reducer
