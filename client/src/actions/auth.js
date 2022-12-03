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
		snackBar('success', 'Registration Successful ! Welcome to memories')
		history('/')
	} catch (error) {
		snackBar('error', error.response.data.message)
	}
}

export const forgotPassword = (formData, history, snackBar) => async () => {
	try {
		await api.sendResetLink(formData)
		snackBar('success', 'Reset Link sent to your Email. Now Reset Password')
		history('/')
	} catch (error) {
		snackBar('error', error.response.data.message)
		console.log(`error: ${error.response.data.error}`)
	}
}

export const setNewPassword = (formData, history, snackBar) => async () => {
	try {
		await api.setNewPassword(formData)
		snackBar('success', 'Password was successfully reset. Now Log in')
		history('/')
	} catch (error) {
		snackBar('error', error.response.data.message)
	}
}
