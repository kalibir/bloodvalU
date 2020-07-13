import {
    RESET_SEARCH,
    SET_RESTAURANTS,
    SET_REVIEWS,
    SET_USER_PROFILES,
} from "../actionTypes";


const initialState = {
    allUsersList: null,
    allRestaurantsList: null,
    allReviewsList: null,
};

export const searchReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_USER_PROFILES: {
            return {...newState, allUsersList: action.payload};
        }
        case SET_RESTAURANTS: {
            return {...newState, allRestaurantsList: action.payload};
        }
        case SET_REVIEWS: {
            return {...newState, allReviewsList: action.payload};
        }
        case RESET_SEARCH: {
            return {...initialState};
        }
        // case UPDATE_LIKED_REVIEW_IN_SEARCH_LIST: {
        //     let index = newState.allReviewsList.findIndex(review => review.id === action.payload.id)
        //     newState.allReviewsList[index] = action.payload
        //     return {...newState, allReviewsList: newState.allReviewsList};
        // }
        default:
            return state;
    }
};
