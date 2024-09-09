import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	open: false,
	severity: 'success',
	message: 'Test message'
}

export const slice = createSlice({
	name: 'notif',
	initialState,
	reducers: {
		openSnackbar: (state, { payload }) => {
			state.open = true
			state.severity = payload.severity
			state.message = payload.message
		},
		closeSnackbar: (state) => {
			state.open = false
			state.severity = initialState.severity
			state.message = initialState.message
		}
	}
})

export const { openSnackbar, closeSnackbar } = slice.actions
export default slice.reducer
