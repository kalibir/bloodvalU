import {
    SET_USER_PROFILE_COMMENTS,
    SET_USER_PROFILE_RESTAURANTS,
    SET_USER_PROFILE_REVIEWS, SET_USER_PROFILE_USER,
} from "../actionTypes";


const initialState = {
    userObj: null,
    userReviews: null,
    userRestaurants: null,
    userComments: null,
};

export const userProfileReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_USER_PROFILE_REVIEWS: {
            return {...newState, userReviews: action.payload};
        }
        case SET_USER_PROFILE_RESTAURANTS: {
            return {...newState, userRestaurants: action.payload};
        }
        case SET_USER_PROFILE_COMMENTS: {
            return {...newState, userComments: action.payload};
        }
        case SET_USER_PROFILE_USER: {
            return {...newState, userObj: action.payload};
        }
        default:
            return state;
    }
};
