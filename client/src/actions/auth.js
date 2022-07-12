import { AUTH } from '../constants/actionTypes'
import * as api from '../api'

export const signin = (formData, history) => async (dispatch) => {
	try {
		// log in the user ...
		const { data } = await api.signIn(formData)
		alert('Sign in Successful !')
		dispatch({ type: AUTH, data })
		history('/')
	} catch (error) {
		alert(error.response.data.message)
	}
}

export const signup = (formData, history) => async (dispatch) => {
	try {
		// sign up the user ...
		const { data } = await api.signUp(formData)
		alert('HELLO WORLD !!')
		dispatch({ type: AUTH, data })
		history('/')
	} catch (error) {
		alert(error.response.data.message)
	}
}
