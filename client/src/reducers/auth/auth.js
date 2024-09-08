import { googleLogout } from '@react-oauth/google'
import { AUTH, LOGOUT } from '../constants/actionTypes'

export default (state = { authData: null }, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
			return { ...state, authData: action?.data }
		case LOGOUT:
			googleLogout()
			localStorage.clear()
			return { ...state, authData: null }
		default:
			return state
	}
}
