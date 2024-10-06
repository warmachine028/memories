import { configureStore } from '@reduxjs/toolkit'
import { authReducer, postReducer, notifReducer, themeReducer } from '@/reducers'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		posts: postReducer,
		notification: notifReducer,
		theme: themeReducer
		// Other reducers...
	}
})
