import { configureStore } from '@reduxjs/toolkit'
import { postReducer, notifReducer, themeReducer } from '@/reducers'
import { api } from '@/api'
export const store = configureStore({
	reducer: {
		posts: postReducer,
		notification: notifReducer,
		theme: themeReducer,
		[api.reducerPath]: api.reducer
		// Other reducers...
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})
