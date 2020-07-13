import {CLEAR_ERRORS, SET_ERROR} from "../actionTypes";


const initialState = {error: null};

export const errorReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_ERROR: {
            return {...newState, error: action.payload}
        }
        case CLEAR_ERRORS: {
            return initialState
        }
        default:
            return state
    }
};
