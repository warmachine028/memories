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
			query: ({ cursor, limit }) => ({
				url: '/posts',
				params: { cursor, limit }
			}),
			providesTags: (result) => (result ? [...result.posts.map(({ id }) => ({ type: 'Post', id })), { type: 'Post', id: 'LIST' }] : [{ type: 'Post', id: 'LIST' }])
		}),
		getPostById: builder.query({
			query: (id) => `/posts/${id}`,
			providesTags: (_, __, id) => [{ type: 'Post', id }]
		}),
		createPost: builder.mutation({
			query: (post) => ({
				url: '/posts',
				method: 'POST',
				body: post
			}),
			async onQueryStarted(post, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					api.util.updateQueryData('getPosts', { cursor: null, limit: 9 }, (draft) => {
						draft.posts.unshift({ ...post, id: 'temp_' + new Date().getTime() })
					})
				)
				try {
					const { data: newPost } = await queryFulfilled
					dispatch(
						api.util.updateQueryData('getPosts', { cursor: null, limit: 9 }, (draft) => {
							const index = draft.posts.findIndex((p) => p.id === 'temp_' + new Date().getTime())
							if (index !== -1) draft.posts[index] = newPost
						})
					)
				} catch {
					patchResult.undo()
				}
			},
			invalidatesTags: [{ type: 'Post', id: 'LIST' }]
		}),
		updatePost: builder.mutation({
			query: ({ id, ...post }) => ({
				url: `/posts/${id}`,
				method: 'PATCH',
				body: post
			}),
			async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					api.util.updateQueryData('getPostById', id, (draft) => {
						Object.assign(draft, patch)
					})
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
			invalidatesTags: (_, __, { id }) => [{ type: 'Post', id }]
		}),
		deletePost: builder.mutation({
			query: (id) => ({
				url: `/posts/${id}`,
				method: 'DELETE'
			}),
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					api.util.updateQueryData('getPosts', { cursor: null, limit: 9 }, (draft) => {
						const index = draft.posts.findIndex((post) => post.id === id)
						if (index !== -1) {
							draft.posts.splice(index, 1)
						}
					})
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
			invalidatesTags: (_, __, id) => [
				{ type: 'Post', id },
				{ type: 'Post', id: 'LIST' }
			]
		})
	})
})

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = api
