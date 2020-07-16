import Axios from "../../axios";
import {SET_LOGGED_IN_USER, USER_LOGIN} from "../actionTypes";
import {getLoggedInUserAction} from "./userActions";
import { setError} from "./errorActions";


export const sendLogin = (token) => {
    return {
        type: USER_LOGIN,
        payload: token,
    };
};


export const setLoggedInUser = (userObj) => {
    localStorage.setItem("profile", JSON.stringify(userObj));
    return {
        type: SET_LOGGED_IN_USER,
        payload: userObj,
    };
};


export const sendLoginAction = data => async (dispatch) => {
    try {
        const response = await Axios.post('/auth/token/', data);
        const {data: {access: token},} = response

        dispatch(getLoggedInUserAction())
        dispatch(sendLogin(token));
        // dispatch(resetError())
        console.log('success')
        localStorage.setItem("token", token);
        return response
    } catch (error) {
        console.log("error message", error.response);
        dispatch(setError(error.response.data.detail))
        console.log("error", error)
        return error
    }
}


