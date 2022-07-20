import {
	//
	FETCHING_RECOMMENDED_POSTS,
	FETCH_RECOMMENDED,
	FETCHED_RECOMMENDED_POSTS,
	FETCH_ALL,
	FETCH_BY_SEARCH,
	USER_DETAILS,
	CREATE,
	UPDATE,
	DELETE,
	DELETE_COMMENT,
	START_LOADING,
	END_LOADING,
	FETCH_POST,
	COMMENT,
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
		const { data } = await api.userDetails(userId)
		dispatch({ type: USER_DETAILS, payload: { data: data } })
		dispatch({ type: END_LOADING })
	} catch (error) {
		console.log(error)
	}
}

export const getUserPostsByType = (userId, page, type) => async (dispatch) => {
	const upperType = type.toUpperCase()
	const fetchingType = `FETCHING_${upperType}_POSTS`
	const fetchType = `FETCH_${upperType}`
	const fetchedType = `FETCHED_${upperType}_POSTS`

	try {
		dispatch({ type: fetchingType })
		const {
			data: { data, numberOfPages },
		} = await api.fetchUserPostsByType(userId, page, type)
		dispatch({ type: fetchType, payload: { data, numberOfPages } })
		dispatch({ type: fetchedType })
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

export const getRecommendedPosts = (tags) => async (dispatch) => {
	try {
		dispatch({ type: FETCHING_RECOMMENDED_POSTS })
		const {
			data: { data },
		} = await api.fetchPostsBySearch({ tags: tags })
		dispatch({ type: FETCH_RECOMMENDED, payload: { data } })
		dispatch({ type: FETCHED_RECOMMENDED_POSTS })
	} catch (error) {
		console.log(error)
	}
}

export const createPost = (post, history, openSnackBar) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING })
		const { data } = await api.createPost(post)
		dispatch({ type: CREATE, payload: data })
		history(`/posts/${data._id}`)
		openSnackBar('success', 'Post created successfully')
		dispatch({ type: END_LOADING })
	} catch (error) {
		openSnackBar('error', error)
	}
}

export const updatePost = (id, post, openSnackBar) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post)
		dispatch({ type: UPDATE, payload: data })
		openSnackBar('info', 'Post updated successfully')
	} catch (error) {
		openSnackBar('error', error)
	}
}

export const deletePost = (id, openSnackBar) => async (dispatch) => {
	try {
		await api.deletePost(id)
		dispatch({ type: DELETE, payload: id })
		location.reload()
		openSnackBar('info', 'Post deleted successfully')
	} catch (error) {
		openSnackBar('error', error)
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
