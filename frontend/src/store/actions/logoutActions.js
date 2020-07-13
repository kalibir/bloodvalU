import {USER_LOGOUT} from "../actionTypes";

export const logout = () => {
    return {
        type: USER_LOGOUT,
    };
};

export const userLogout = () => (dispatch) => {
    localStorage.clear();
    dispatch(logout());
};

