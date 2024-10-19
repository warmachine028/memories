import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		}
	}),
	endpoints: (builder) => ({
		getPosts: builder.query({ query: () => '/posts' }),
		getPostById: builder.query({ query: (id) => `/posts/${id}` }),
		createPost: builder.mutation({
			query: (post) => ({ url: '/posts', method: 'POST', body: post })
		}),
		updatePost: builder.mutation({
			query: ({ id, post }) => ({ url: `/posts/${id}`, method: 'PATCH', body: post })
		}),
		deletePost: builder.mutation({
			query: (id) => ({ url: `/posts/${id}`, method: 'DELETE' })
		})
	})
})
