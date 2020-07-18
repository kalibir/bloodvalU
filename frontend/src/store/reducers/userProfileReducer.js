import {
    BUY_TEST,
    SET_REQUESTS, SET_TESTS,
    SET_USER_PROFILE_USER, UPDATE_REQUEST_IN_ALL_REQUESTS

} from "../actionTypes";


const initialState = {
    userObj: null,
    requests: null,
    offeredTests: null,
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
        case SET_TESTS: {
            return {...newState, offeredTests: action.payload};
        }
        case UPDATE_REQUEST_IN_ALL_REQUESTS: {
            let index = newState.requests.findIndex(
                (request) => request.id === action.payload.id
            );
            newState.requests[index] = action.payload;
            return {...newState, requests: newState.requests}
        }
        case BUY_TEST: {
            let index = newState.offeredTests.findIndex(
                (request) => request.id === action.payload.id
            );
            newState.offeredTests[index] = action.payload;
            return {...newState, offeredTests: newState.offeredTests}
        }
        default:
            return state;
    }
};
