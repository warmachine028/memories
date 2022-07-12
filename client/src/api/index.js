import axios from 'axios'

const apiURL = ['https://memories-pritam.herokuapp.com', 'http://localhost:5000']
const API = axios.create({
	baseURL: apiURL[0],
	timeout: 50000,
	headers: {
		'Access-Control-Allow-Origin': 'https://memories-pritam.netlify.app'
	}
})

API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
	}
	return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`)
export const fetchUserDetails = (userId) => API.get(`/posts/user/details/${userId}`)
export const fetchPostsLiked = (userId, page) => API.get(`/posts/user/liked/${userId}?page=${page}`)
export const fetchPostsCreated = (userId, page) => API.get(`/posts/user/created/${userId}?page=${page}`)
export const fetchPostsPrivate = (userId, page) => API.get(`/posts/user/private/${userId}?page=${page}`)

export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`)
export const deleteComment = (id, commentId) => API.patch(`/posts/${id}/deleteComment`, { commentId })
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const comment = (comment, id) => API.post(`/posts/${id}/commentPost`, comment)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
