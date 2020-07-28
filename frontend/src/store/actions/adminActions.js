import Axios from "../../axios";
import {UPDATE_PROFILE_IN_ALL_PROFILES} from "../actionTypes";


export const updateProfileInAll = (profileObj) => {
    return {
        type: UPDATE_PROFILE_IN_ALL_PROFILES,
        payload: profileObj
    }
}

export const toggleVerifyAction = (seekerID) => async (dispatch) => {
    try {
        const response =  await Axios.post(`seeker/verify/${seekerID}/`);
        dispatch(updateProfileInAll(response.data))
        return response
    } catch (error) {
        return error
    }
}