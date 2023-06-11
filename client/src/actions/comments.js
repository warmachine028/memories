import { CREATE_COMMENT, DELETE_COMMENT, FETCHED_COMMENTS, FETCHING_COMMENTS, FETCH_COMMENTS } from '../constants/actionTypes'
import * as api from '../api'

export const getComments = (postId, snackBar) => async (dispatch) => {
	try {
		dispatch({ type: FETCHING_COMMENTS })
		const { data } = await api.fetchComments(postId)
		dispatch({ type: FETCH_COMMENTS, payload: data })
		dispatch({ type: FETCHED_COMMENTS })
	} catch (error) {
		if (typeof error === 'object') {
			snackBar('warning', `${error.message}: Please Try again`)
			dispatch({ type: FETCHED_COMMENTS })
		} else {
			snackBar('error', error)
		}
	}
}

export const createComment = (comment, snackBar) => async (dispatch) => {
	try {
		dispatch({ type: FETCHING_COMMENTS })
		const { data } = await api.createComment(comment)
		dispatch({ type: CREATE_COMMENT, payload: data })
		dispatch({ type: FETCHED_COMMENTS })
		return data
	} catch (error) {
		if (typeof error === 'object') {
			snackBar('warning', `${error.message}: Please Try again`)
			dispatch({ type: FETCHED_COMMENTS })
		} else {
			snackBar('error', error)
		}
	}
}

export const deleteComment = (commentId, snackBar) => async (dispatch) => {
	try {
		dispatch({ type: FETCHING_COMMENTS })
		await api.deleteComment(commentId)
		dispatch({ type: DELETE_COMMENT, payload: commentId })
		dispatch({ type: FETCHED_COMMENTS })
	} catch (error) {
		if (typeof error === 'object') {
			snackBar('warning', `${error.message}: Please Try again`)
			dispatch({ type: FETCHED_COMMENTS })
		} else {
			snackBar('error', error)
		}
	}
}
