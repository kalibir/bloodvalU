import Axios from "../../axios";
import {setLoggedInUser} from "./loginActions";
import {userLogout} from "./logoutActions";
import {resetError, setError} from "./errorActions";
import {SET_ALL_PROFILES} from "../actionTypes";


export const getLoggedInUserAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`me/`)
        dispatch(setLoggedInUser(response.data))
        localStorage.setItem("profile", JSON.stringify(response.data));
        return response
    } catch (error) {
        return error
    }
}


export const updateProfileAction = data => async (dispatch) => {
    try {
        const response = await Axios.patch(`me/`, data)
        dispatch(resetError())
        dispatch(setLoggedInUser(response.data))
        return response
    } catch (error) {
        dispatch(setError(Object.keys(error.response.data)[0]))
        return error
    }
}

export const deleteUserAction = () => async (dispatch) => {
    try {
        const response = await Axios.delete(`me/`)
        dispatch(userLogout())
        return response
    } catch (error) {
        return error
    }
}



export const setProfiles = (profiles) => {
    return {
        type: SET_ALL_PROFILES,
        payload: profiles,
    };
};


export const getAllSeekersAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`seeker/list/`)
        dispatch(setProfiles(response.data))
        return response
    } catch (error) {
        return error
    }
}


