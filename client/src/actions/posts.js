import {
	FETCH_ALL,

	FETCHING_CREATED_POSTS,
	FETCHED_CREATED_POSTS,
	FETCH_CREATED,

	FETCHING_LIKED_POSTS,
	FETCHED_LIKED_POSTS,
	FETCH_LIKED,

	FETCHING_PRIVATE_POSTS,
	FETCHED_PRIVATE_POSTS,
	FETCH_PRIVATE,

	FETCH_BY_SEARCH, USER_DETAILS, CREATE, UPDATE, DELETE, DELETE_COMMENT, START_LOADING, END_LOADING, FETCH_POST, COMMENT
} from '../constants/actionTypes'
import * as api from '../api'

// Action Creators
export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING })
		const {
			data: { data, curretPage: currentPage, numberOfPages },
		} = await api.fetchPosts(page)
		dispatch({ type: FETCH_ALL, payload: { data, currentPage: currentPage, numberOfPages } })
		dispatch({ type: END_LOADING })
	} catch (error) {
		console.log(error)
	}
}

export const getUserDetails = (userId) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING })
		const { data } = await api.fetchUserDetails(userId)
		dispatch({ type: USER_DETAILS, payload: { data: data } })
		dispatch({ type: END_LOADING })
	} catch (error) {
		console.log(error)
	}
}

export const getPostsLiked = (userId, page) => async (dispatch) => {
	try {
		dispatch({ type: FETCHING_LIKED_POSTS })
		const {
			data: { data, numberOfPages },
		} = await api.fetchPostsLiked(userId, page)
		dispatch({ type: FETCH_LIKED, payload: { data, numberOfPages } })
		dispatch({ type: FETCHED_LIKED_POSTS })
	} catch (error) {
		console.log(error)
	}
}

export const getPostsCreated = (userId, page) => async (dispatch) => {
	try {
		dispatch({ type: FETCHING_CREATED_POSTS })
		const {
			data: { data, numberOfPages },
		} = await api.fetchPostsCreated(userId, page)
		dispatch({ type: FETCH_CREATED, payload: { data, numberOfPages } })
		dispatch({ type: FETCHED_CREATED_POSTS })
	} catch (error) {
		console.log(error)
	}
}

export const getPostsPrivate = (userId, page) => async (dispatch) => {
	dispatch({ type: FETCHING_PRIVATE_POSTS })
	const {
		data: { data, numberOfPages },
	} = await api.fetchPostsPrivate(userId, page)
	dispatch({ type: FETCH_PRIVATE, payload: { data, numberOfPages } })
	dispatch({ type: FETCHED_PRIVATE_POSTS })
}

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING })
		const { data } = await api.fetchPost(id)
		dispatch({ type: FETCH_POST, payload: { post: data } })
		dispatch({ type: END_LOADING })
	} catch (error) {
		console.log(error)
	}
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING })
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery)
		dispatch({ type: FETCH_BY_SEARCH, payload: { data } })
		dispatch({ type: END_LOADING })
	} catch (error) {
		console.log(error)
	}
}
export const createPost = (post, history) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING })
		const { data } = await api.createPost(post)
		dispatch({ type: CREATE, payload: data })
		history(`/posts/${data._id}`)
		dispatch({ type: END_LOADING })
	} catch (error) {
		console.log(error)
	}
}

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post)
		dispatch({ type: UPDATE, payload: data })
	} catch (error) {
		console.log(error)
	}
}

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id)
		dispatch({ type: DELETE, payload: id })
	} catch (error) {
		console.log(error)
	}
}

export const deleteComment = (id, commentId) => async (dispatch) => {
	try {
		const { data } = await api.deleteComment(id, commentId)
		dispatch({ type: DELETE_COMMENT, payload: data })
		return data.comments
	} catch (error) {
		console.log(error)
	}
}

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id)
		dispatch({ type: UPDATE, payload: data })
	} catch (error) {
		console.log(error)
	}
}

export const commentPost = (comment, id) => async (dispatch) => {
	try {
		const { data } = await api.comment(comment, id)
		dispatch({ type: COMMENT, payload: data })
		return data.comments
	} catch (error) {
		console.log(error)
	}
}
