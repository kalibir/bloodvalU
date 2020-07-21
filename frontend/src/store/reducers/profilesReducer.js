import {
    SET_ALL_PROFILES,
} from "../actionTypes";

const initialState = {
    profiles: null,
};

export const profilesReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_ALL_PROFILES: {
            return {...newState, profiles: action.payload};
        }
        default:
            return state;
    }
};
