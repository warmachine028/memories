import { createSlice } from '@reduxjs/toolkit'
import { signUp, logIn, logOut, forgetPassword, resetPassword } from '@/actions/auth'
import { user } from '@/data/users' // user,

const initialState = {
	user,
	loading: false,
	user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
	error: null
}

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
