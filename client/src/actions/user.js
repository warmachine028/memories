import { LOGOUT } from '../constants/actionTypes'
import * as api from '../api'

export const updateUser = (formData, history, setUser, openSnackBar) => async (dispatch) => {
	try {
		await api.updateUser(formData)
		dispatch({ type: LOGOUT })
		setUser(null)
		openSnackBar('success', 'Update Successful ! Now Log in')
		history('/')
	} catch (error) {
		openSnackBar('error', error.response.data.message)
	}
}
