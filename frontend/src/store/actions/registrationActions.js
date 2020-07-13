import {resetError, setError} from "./errorActions";
import Axios from "../../axios";


export const sendCode = data => async (dispatch) => {
    try {
        console.log("data obj", data)
        const response = await Axios.post('auth/registration/', data);
        // TODO use an axios await on COMPONENT to check whether the code sent was successful
        dispatch(resetError())
        console.log("success!", response.data)
        return response
    } catch (error) {
        console.log("error message", error.response)
        dispatch(setError(error.response.data.email))
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