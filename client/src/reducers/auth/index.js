import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: null
}

export const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateAuthToken: (state, action) => {
			state.token = action.payload
		}
	}
})
export const { updateAuthToken } = slice.actions
export default slice.reducer
