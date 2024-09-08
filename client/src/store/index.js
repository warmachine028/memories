import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/auth'
import postReducer from '../reducers/post'

const reducer = combineReducers({
	authReducer,
	postReducer
	// add more reducers here
})

export const store = configureStore({ reducer })
