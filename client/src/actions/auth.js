import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleApiCall } from '@/lib'
import {
	signUp as signUpAPI,
	signIn as signInAPI, //
	// googleSignIn as googleSignInAPI,
	sendResetLink,
	setNewPassword
} from '@/api'
// import { googleLogout } from '@react-oauth/google'

export const signUp = createAsyncThunk(
	'auth/signup', //
	(formData, thunkAPI) => {
		handleApiCall(signUpAPI, formData, thunkAPI)
	}
)

export const logIn = createAsyncThunk(
	'auth/login', //
	(formData, thunkAPI) => {
		handleApiCall(signInAPI, formData, thunkAPI)
	}
)

// export const googleSignIn = createAsyncThunk(
// 	'auth/google-signin', //
// 	(formData, thunkAPI) => {
// 		handleApiCall(googleSignInAPI, formData.result, thunkAPI)
// 	}
// )

export const logOut = createAsyncThunk(
	'auth/logout', //
	() => {
		// googleLogout()
		localStorage.removeItem('user')
	}
)

export const forgetPassword = createAsyncThunk(
	'auth/forgot-password', //
	(formData, thunkAPI) => {
		handleApiCall(sendResetLink, formData, thunkAPI)
	}
)

export const resetPassword = createAsyncThunk(
	'auth/reset-password', //
	(formData, thunkAPI) => {
		handleApiCall(setNewPassword, formData, thunkAPI)
	}
)
