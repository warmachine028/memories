import { FETCH_ALL, FETCH_CREATED, FETCHING_CREATED_POSTS, FETCHED_CREATED_POSTS, FETCHING_LIKED_POSTS, FETCHED_LIKED_POSTS, FETCH_LIKED, CREATE, UPDATE, FETCH_POST, DELETE, DELETE_COMMENT, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT, USER_DETAILS } from '../constants/actionTypes'

export default (state = { isFetchingCreatedPosts: true,  isFetchingLikedPosts: true, isLoading: true, posts: [], data: {}, likedPosts: [], createdPosts: []}, action) => {
	switch (action.type) {
		case FETCHING_CREATED_POSTS:
			return { ...state, isFetchingCreatedPosts: true }
		case FETCHING_LIKED_POSTS:
			return { ...state, isFetchingLikedPosts: true }
		case START_LOADING:
			return { ...state, isLoading: true }
		case FETCH_ALL:
			return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages }
		case FETCH_BY_SEARCH:
			return { ...state, posts: action.payload.data }
		case USER_DETAILS:
			return { ...state, data: action.payload.data }
		case FETCH_LIKED:
			return { ...state, likedPosts: action.payload.data, likedNumberOfPages: action.payload.numberOfPages }
		case FETCH_CREATED:
			return { ...state, createdPosts: action.payload.data, createdNumberOfPages: action.payload.numberOfPages }
		case CREATE:
			return { ...state, posts: [...state.posts, action.payload] }
		case FETCH_POST:
			return { ...state, post: action.payload.post }
		case UPDATE:
			return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }
		case DELETE:
			return { ...state, posts: state.posts.filter((post) => (post._id !== action.payload._id ? action.payload : post)) }
		case DELETE_COMMENT:
			return { ...state, posts: state.posts.map((post) => (post._id === +action.payload._id ? action.payload : post)) }
		case COMMENT:
			return { ...state, posts: state.posts.map((post) => (post._id === +action.payload._id ? action.payload : post)) }
		case END_LOADING:
			return { ...state, isLoading: false }
		case FETCHED_LIKED_POSTS:
			return { ...state, isFetchingLikedPosts: false }
		case FETCHED_CREATED_POSTS:
			return { ...state, isFetchingCreatedPosts: false }
		default:
			return state
	}
}
