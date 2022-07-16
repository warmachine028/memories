import { LOGOUT } from '../constants/actionTypes'
import * as api from '../api'

export const updateUser = (formData, history, setUser) => async (dispatch) => {
	try {
		await api.updateUser(formData)
		alert('Update Successful !')
		dispatch({ type: LOGOUT })
		setUser(null)
		history('/')
	} catch (error) {
		alert(error.response.data.message)
	}
}
