import {
    BUY_TEST,
    ADD_REQUEST_TO_LIST,
    SET_REQUESTS,
    SET_TESTS,
    SET_USER_PROFILE_USER,
    UPDATE_REQUEST_IN_ALL_REQUESTS,
    REMOVE_REQUEST_FROM_LIST,
    ADD_TEST_TO_LIST,
    REMOVE_TEST_FROM_LIST, SET_ALL_STATISTICS

} from "../actionTypes";

const initialState = {
  userObj: null,
  requests: null,
  offeredTests: null,
  statistics: null,
};

export const userProfileReducer = (state = initialState, action) => {
  const newState = { ...state };
    switch (action.type) {
        case SET_USER_PROFILE_USER: {
            return {...newState, userObj: action.payload};
        }
        case SET_ALL_STATISTICS: {
            return {...newState, statistics: action.payload};
        }
        case SET_REQUESTS: {
            return {...newState, requests: action.payload};
        }
        case SET_TESTS: {
            return {...newState, offeredTests: action.payload};
        }
        case ADD_REQUEST_TO_LIST: {
            if (newState.requests) return {...newState, requests: [action.payload, ...newState.requests]};
            else return {...newState, requests: [action.payload]};
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
        case REMOVE_REQUEST_FROM_LIST: {
            const newRequests = newState.requests.filter(
                request => request.id !== action.payload
            );
            return {...newState, requests: newRequests};
        }
        case REMOVE_TEST_FROM_LIST: {
            const newTests = newState.offeredTests.filter(
                test => test.id !== action.payload
            );
            return {...newState, offeredTests: newTests};
        }
        case ADD_TEST_TO_LIST: {
            if (newState.offeredTests)
                return { ...newState, offeredTests: [action.payload, ...newState.offeredTests] };
            else return { ...newState, offeredTests: [action.payload] };
        }
    default:
      return state;
  }
};
