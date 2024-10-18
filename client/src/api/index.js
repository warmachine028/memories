import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useAuth } from '@clerk/clerk-react'

const baseUrl = import.meta.env.VITE_API_URL

console.log(baseUrl)
export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => {
			const { getToken } = useAuth()

			getToken().then((token) => {
				if (token) {
					headers.set('Authorization', `Bearer ${token}`)
				}
			})
			return headers
		}
	}),
	endpoints: (builder) => ({
		getPosts: builder.query({ query: () => '/posts' }),
		getPostById: builder.query({ query: (id) => `/posts/${id}` }),
		createPost: builder.mutation({
			query: (post) => ({ url: '/posts', method: 'POST', body: post })
		})
	})
})
