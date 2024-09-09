import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/api'
import { googleLogout } from '@react-oauth/google'
import { user } from '@/data/users'

const initialState = {
	loading: false,
	// user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
	user: user,
	error: null
}

// Reusable function for API calls
const handleApiCall = async (apiFunc, formData, thunkAPI) => {
	try {
		const response = await apiFunc(formData)
		return response.data || response
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
	}
}

export const signUp = createAsyncThunk('auth/signup', (formData, thunkAPI) => handleApiCall(api.signUp, formData, thunkAPI))

export const logIn = createAsyncThunk('auth/login', (formData, thunkAPI) => handleApiCall(api.signIn, formData, thunkAPI))

export const googleSignIn = createAsyncThunk('auth/googleSignIn', (formData, thunkAPI) => handleApiCall(api.googleSignIn, formData.result, thunkAPI))

export const logOut = createAsyncThunk('auth/logout', () => {
	googleLogout()
	localStorage.removeItem('user')
})

export const forgetPassword = createAsyncThunk('auth/forgotPassword', (formData, thunkAPI) => handleApiCall(api.sendResetLink, formData, thunkAPI))

export const resetPassword = createAsyncThunk('auth/resetPassword', (formData, thunkAPI) => handleApiCall(api.setNewPassword, formData, thunkAPI))

export const slice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(signUp.pending, (state) => {
				state.loading = true
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
				state.error = null
			})
			.addCase(signUp.rejected, (state, action) => {
				state.loading = false
				state.user = null
				state.error = action.payload
			})
			.addCase(logIn.pending, (state) => {
				state.loading = true
			})
			.addCase(logIn.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
				state.error = null
			})
			.addCase(logIn.rejected, (state, action) => {
				state.loading = false
				state.user = null
				state.error = action.payload
			})
			.addCase(googleSignIn.pending, (state) => {
				state.loading = true
			})
			.addCase(googleSignIn.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
				state.error = null
			})
			.addCase(googleSignIn.rejected, (state, action) => {
				state.loading = false
				state.user = null
				state.error = action.payload
			})
			.addCase(logOut.fulfilled, (state) => {
				state.loading = false
				state.user = null
				state.error = null
			})
			.addCase(forgetPassword.fulfilled, (state) => {
				state.loading = false
				state.error = null
			})
			.addCase(resetPassword.pending, (state) => {
				state.loading = true
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.loading = false

				state.error = null
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export default slice.reducer
