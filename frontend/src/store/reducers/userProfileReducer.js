import {
    SET_APPLIED_REQUESTS,
    SET_REQUESTS, SET_TESTS,
    SET_USER_PROFILE_USER

} from "../actionTypes";


const initialState = {
    userObj: null,
    requests: null,
    offeredTests: null,
    appliedRequests: null,
};

export const userProfileReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_USER_PROFILE_USER: {
            return {...newState, userObj: action.payload};
        }
        case SET_REQUESTS: {
            return {...newState, requests: action.payload};
        }
        case SET_APPLIED_REQUESTS: {
            return {...newState, appliedRequests: action.payload};
        }
        case SET_TESTS: {
            return {...newState, offeredTests: action.payload};
        }
        default:
            return state;
    }
};
