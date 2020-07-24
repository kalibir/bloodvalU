import {resetError, setError} from "./errorActions";
import Axios from "../../axios";
import {SET_EMAIL, SET_IS_DONOR} from "../actionTypes";

export const setIsDonor = (pythonBooleanString) => {
    return {
        type: SET_IS_DONOR,
        payload: pythonBooleanString,
    };
};

export const setEmail = (email) => {
    return {
        type: SET_EMAIL,
        payload: email,
    };
};

export const sendCode = data => async (dispatch) => {
    try {
        const response = await Axios.post('auth/registration/', data);
        dispatch(resetError())
        return response
    } catch (error) {
        //if (error.response.data.email)dispatch(setError(error.response.data.email[0]))
        return error
    }
}

export const resetPasswordSendCode = data => async (dispatch) => {
    try {
        const response = await Axios.post('auth/password-reset/', data);
        dispatch(resetError())
        return response
    } catch (error) {
        //if (error.response.data.email)dispatch(setError(error.response.data.email[0]))
        return error
    }
}

export const validate = data => async (dispatch) => {
    try {
        const response = await Axios.post('auth/registration/validation/', data);
        dispatch(resetError())
        return response
    } catch (error) {
        dispatch(setError(Object.keys(error.response.data)[0]))
        return error.response
    }
}

export const resetValidate = data => async (dispatch) => {
    try {
        const response = await Axios.patch('auth/password-reset/validation/', data);
        dispatch(resetError())
        return response
    } catch (error) {
        dispatch(setError(Object.keys(error.response.data)[0]))
        return error.response
    }
}