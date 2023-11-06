import * as types from '../actions/types';

const rootReducer = (state, action) => {
    switch (action.type) {
        case types.GET_POST:
            return {
                ...state,
                posts: action.payload,
            };

        case types.ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            }

        case types.UPDATE_POST:
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.id) {
                    return action.payload;
                }
                return post;
            });
            return {
                ...state,
                posts: updatedPosts,
            }

        case types.DELETE_POST:
            const deletedPosts = state.posts.filter((post) => post.id !== action.payload);
            return {
                ...state,
                posts: deletedPosts,
            }
        default:
            return state;
    }
}

export default rootReducer;