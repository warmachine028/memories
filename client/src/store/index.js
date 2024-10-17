import { configureStore } from '@reduxjs/toolkit'
import { postReducer, notifReducer, themeReducer } from '@/reducers'

export const store = configureStore({
	reducer: {
		posts: postReducer,
		notification: notifReducer,
		theme: themeReducer
		// Other reducers...
	}
})
