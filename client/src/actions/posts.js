import { FETCH_ALL, FETCH_BY_SEARCH, USER_DETAILS, FETCH_BY_USER, CREATE, UPDATE, DELETE, DELETE_COMMENT, START_LOADING, END_LOADING, FETCH_POST, COMMENT } from '../constants/actionTypes'
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

export const getPostsByUser = (userId, type) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING })
		const { data } = await api.fetchPostsByUserId(userId, type)
		dispatch({ type: FETCH_BY_USER, payload: { data } })
		dispatch({ type: END_LOADING })
	} catch (error) {
		console.log(error)
	}
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
