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
	tagTypes: ['Post'],
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: ({ cursor = '', limit = 9 }) => ({
				url: '/posts',
				params: { cursor, limit }
			}),
			transformResponse: (response, _, arg) => {
				const limit = arg.limit || 9
				return {
					posts: response.slice(0, limit),
					nextCursor: response.length > limit ? response[limit].id : undefined
				}
			},
			providesTags: (result) => (result ? [...result.posts.map(({ id }) => ({ type: 'Post', id })), { type: 'Post', id: 'LIST' }] : [{ type: 'Post', id: 'LIST' }])
		}),
		getPostById: builder.query({
			query: (id) => `/posts/${id}`,
			providesTags: (result, error, id) => [{ type: 'Post', id }]
		}),
		createPost: builder.mutation({
			query: (post) => ({
				url: '/posts',
				method: 'POST',
				body: post
			}),
			invalidatesTags: [{ type: 'Post', id: 'LIST' }]
		}),
		updatePost: builder.mutation({
			query: ({ id, ...post }) => ({
				url: `/posts/${id}`,
				method: 'PATCH',
				body: post
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
		}),
		deletePost: builder.mutation({
			query: (id) => ({
				url: `/posts/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, id) => [
				{ type: 'Post', id },
				{ type: 'Post', id: 'LIST' }
			]
		})
	})
})
