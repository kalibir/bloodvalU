import {
    SET_ALL_PROFILES, UPDATE_PROFILE_IN_ALL_PROFILES,
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
        case UPDATE_PROFILE_IN_ALL_PROFILES: {
            let index = newState.profiles.findIndex(
                (request) => request.id === action.payload.id
            );
            newState.profiles[index] = action.payload;
            return {...newState, profiles: newState.profiles}
        }
        default:
            return state;
    }
};
