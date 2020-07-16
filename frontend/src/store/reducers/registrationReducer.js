import {SET_IS_DONOR} from "../actionTypes";


const initialState = {
    email: null,
    password: null,
    isDonor: "True",
};

export const registrationReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_IS_DONOR: {
            return {...newState, isDonor: action.payload};
        }
        default:
            return state;
    }
};
