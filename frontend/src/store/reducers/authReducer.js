import {SET_IS_LOGIN, SET_LOGGED_IN_USER, USER_LOGIN, USER_LOGOUT} from "../actionTypes";

const initialState = {
    token: null,
    authenticated: false,
    userObj: null,
    isLogin: false,
};

export const authReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case USER_LOGIN: {
            return {...newState, token: action.payload, authenticated: true};
        }
        case SET_IS_LOGIN: {
            return {...newState, isLogin: action.payload};
        }
        case USER_LOGOUT: {
            localStorage.clear()
            return {...initialState};
        }
        case SET_LOGGED_IN_USER: {
            return {...newState, userObj: action.payload};
        }
        default:
            return state;
    }
};
