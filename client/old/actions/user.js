import { LOGOUT } from '../constants/actionTypes'
import * as api from '../api'

export const updateUser = (formData, history, setUser, snackBar) => async (dispatch) => {
	try {
		await api.updateUser(formData)
		dispatch({ type: LOGOUT })
		setUser(null)
		snackBar('success', 'Update Successful ! Now Log in')
		history('/')
	} catch (error) {
		snackBar('error', error.response.data.message)
	}
}
