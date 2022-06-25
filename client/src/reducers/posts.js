import { FETCH_ALL, CREATE, UPDATE, FETCH_POST, DELETE, DELETE_COMMENT, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes'

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case FETCH_ALL:
            return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages }
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data }
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] }
        case FETCH_POST:
            return { ...state, post: action.payload.post }
        case UPDATE:
            return { ...state, posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post)) }
        case DELETE:
            return { ...state, posts: state.posts.filter(post => (post._id !== action.payload._id ? action.payload : post)) }
        case DELETE_COMMENT:
            return { ...state, posts: state.posts.map(post => (post._id === +action.payload._id ? action.payload : post))}
        case COMMENT:
            return { ...state, posts: state.posts.map(post => (post._id === +action.payload._id ? action.payload : post)) }
        case END_LOADING:
            return { ...state, isLoading: false }
        default:
            return state
    }
}
