import {
	//
	FETCH_RECOMMENDED,
	FETCHING_RECOMMENDED_POSTS,
	FETCHED_RECOMMENDED_POSTS,
	FETCH_ALL,
	FETCH_CREATED,
	FETCHING_CREATED_POSTS,
	FETCHED_CREATED_POSTS,
	FETCHING_LIKED_POSTS,
	FETCHED_LIKED_POSTS,
	FETCH_LIKED,
	CREATE,
	UPDATE,
	FETCH_POST,
	DELETE,
	DELETE_COMMENT,
	FETCH_BY_SEARCH,
	START_LOADING,
	END_LOADING,
	COMMENT,
	USER_DETAILS,
	FETCHING_PRIVATE_POSTS,
	FETCHED_PRIVATE_POSTS,
	FETCH_PRIVATE,
	FETCHING_COMMENTS,
	FETCH_COMMENTS,
	FETCHED_COMMENTS,
	CREATE_COMMENT,
	CREATING_POST,
	CREATED_POST,
	DELETING_POST,
	DELETED_POST,
} from '../constants/actionTypes'

export default (
	
	state = {
		isFetchingCreatedPosts: true,
		isFetchingLikedPosts: true,
		isFetchingPrivatePosts: true,
		isFetchingRecommendedPosts: true,
		isFetchingComments: true,
		isCreatingPost: false,
		isDeletingPost: false,
		isLoading: true,
		posts: [],
		data: {},
		likedPosts: [],
		createdPosts: [],
		recommendedPosts: [],
		privatePosts: [],
		comments: [],
		userComments: [],
	},action
) => {
	switch (action.type) {
		case FETCHING_CREATED_POSTS:
			return { ...state, isFetchingCreatedPosts: true }
		case FETCHING_LIKED_POSTS:
			return { ...state, isFetchingLikedPosts: true }
		case FETCHING_PRIVATE_POSTS:
			return { ...state, isFetchingPrivatePosts: true }
		case FETCHING_RECOMMENDED_POSTS:
			return { ...state, isFetchingRecommendedPosts: true }
		case FETCHING_COMMENTS:
			return { ...state, isFetchingComments: true }
		case START_LOADING:
			return { ...state, isLoading: true }
		case FETCH_COMMENTS:
			return { ...state, comments: action.payload.comments ? [] : action.payload, commentsNumberOfPages: action.payload.numberOfPages, userComments: action.payload.comments }
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
		case FETCH_PRIVATE:
			return { ...state, privatePosts: action.payload.data, privateNumberOfPages: action.payload.numberOfPages }
		case FETCH_RECOMMENDED:
			return { ...state, recommendedPosts: action.payload.data }
		case CREATE_COMMENT:
			return { ...state, comments: [...state.comments, action.payload] }
		case CREATE:
			return { ...state, posts: [...state.posts, action.payload] }
		case FETCH_POST:
			return { ...state, post: action.payload.post }
		case UPDATE:
			return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }
		case DELETE:
			return { ...state, posts: state.posts.filter((post) => (post._id !== action.payload._id ? action.payload : post)) }
		case DELETE_COMMENT:
			return { ...state, comments: state.comments.filter((comment) => comment._id !== action.payload) }
		case COMMENT:
			return { ...state, posts: state.posts.map((post) => (post._id === Number(action.payload._id) ? action.payload : post)) }
		case END_LOADING:
			return { ...state, isLoading: false }
		case FETCHED_RECOMMENDED_POSTS:
			return { ...state, isFetchingRecommendedPosts: false }
		case FETCHED_PRIVATE_POSTS:
			return { ...state, isFetchingPrivatePosts: false }
		case FETCHED_LIKED_POSTS:
			return { ...state, isFetchingLikedPosts: false }
		case FETCHED_CREATED_POSTS:
			return { ...state, isFetchingCreatedPosts: false }
		case FETCHED_COMMENTS:
			return { ...state, isFetchingComments: false }
		case CREATING_POST:
			return { ...state, isCreatingPost: true }
		case CREATED_POST:
			return { ...state, isCreatingPost: false }
		case DELETING_POST:
			return { ...state, isDeletingPost: true }
		case DELETED_POST:
			return { ...state, isDeletingPost: false }

		default:
			return state
	}
}
