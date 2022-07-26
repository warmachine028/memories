import { AUTH } from '../constants/actionTypes'
import * as api from '../api'

export const signin = (formData, history, snackBar) => async (dispatch) => {
	try {
		// log in the user ...
		const { data } = await api.signIn(formData)
		dispatch({ type: AUTH, data })
		snackBar('success', 'Logged in Successfully')
		history('/')
	} catch (error) {
		snackBar('error', error.response.data.message)
	}
}

export const signup = (formData, history, snackBar) => async (dispatch) => {
	try {
		// sign up the user ...
		const { data } = await api.signUp(formData)
		dispatch({ type: AUTH, data })
		snackBar('success', 'Registration Successful ! Now Log in')
		history('/')
	} catch (error) {
		snackBar('error', error.response.data.message)
	}
}
