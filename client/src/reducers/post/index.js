import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	posts: [],
	error: null,
	loading: false,
	hasMore: true,
	post: null
}

export const getPosts = createAsyncThunk('post/getPosts', async (_, { getState, rejectWithValue }) => {
	try {
		const { posts } = getState().posts
		const skip = posts.length

		// Fetch posts and random users in parallel
		const [postsResponse, usersResponse] = await Promise.all([
			axios.get(`https://dummyjson.com/posts?limit=10&skip=${skip}`), //
			axios.get('https://randomuser.me/api/?results=10')
		])

		const postsWithImages = postsResponse.data.posts.map((post, index) => {
			const authorData = usersResponse.data.results[index]
			return {
				...post,
				imageUrl: `https://picsum.photos/seed/${post.id}/800/600`,
				author: {
					id: authorData.login.uuid,
					fullName: `${authorData.name.first} ${authorData.name.last}`,
					imageUrl: `https://i.pravatar.cc/150?u=${post.id}`
				}
			}
		})

		return { posts: postsWithImages }
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return rejectWithValue(error.message)
		}
		return rejectWithValue('An unknown error occurred')
	}
})

export const getPost = createAsyncThunk('post/getPost', async (id, { rejectWithValue }) => {
	try {
		const response = await axios.get(`https://dummyjson.com/posts/${id}`)
		const imageResponse = await axios.get('https://picsum.photos/1600/800', {
			responseType: 'blob'
		})
		const imageUrl = URL.createObjectURL(imageResponse.data)
		return { ...response.data, imageUrl }
	} catch (error) {
		return rejectWithValue(error.message)
	}
})
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
			.addCase(getPost.pending, (state) => {
				state.loading = true
			})
			.addCase(getPost.fulfilled, (state, action) => {
				state.loading = false
				state.post = action.payload
				state.error = null
			})
			.addCase(getPost.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Something went wrong'
			})
	}
})

export default slice.reducer
