
import Axios from "../../axios";
import {setLoggedInUser} from "./loginActions";
import {userLogout} from "./logoutActions";
import {resetError, setError} from "./errorActions";



export const getLoggedInUserAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`me/`)
        console.log("me", response.data)
        dispatch(setLoggedInUser(response.data))
        localStorage.setItem("profile", JSON.stringify(response.data));
        return response
    } catch (error) {
        console.log('error', error.response.data)
        return error
    }
}


export const updateUserAction = data => async (dispatch) => {
    try {
        const response = await Axios.patch(`users/me/`, data)
        console.log("in the patch:", response.data)
        dispatch(resetError())
        dispatch(setLoggedInUser(response.data))
        return response
    } catch (error) {
        console.log('error', error.response.data)
        dispatch(setError(Object.keys(error.response.data)[0]))
        return error
    }
}

export const deleteUserAction = () => async (dispatch) => {
    try {
        const response = await Axios.delete(`me/`)
        console.log("in the delete")
        dispatch(userLogout())
        return response
    } catch (error) {
        console.log('error', error.response.data)

        return error
    }
}


