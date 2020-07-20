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
        console.log("success!")
        return response
    } catch (error) {
        console.log("error message", error.response)
        if (error.response.data.email)dispatch(setError(error.response.data.email[0]))
        else console.log("error ", error.response)

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
        console.log("error in validate", error.response);
        return error.response
    }
}