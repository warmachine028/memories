import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
	name: 'theme',
	initialState: 'system',
	reducers: {
		setThemeAction: (_, action) => action.payload
	}
})

export const { setThemeAction } = slice.actions
export default slice.reducer
