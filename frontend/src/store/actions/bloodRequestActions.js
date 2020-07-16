import Axios from "../../axios";
import {SET_APPLIED_REQUESTS, SET_REQUESTS} from "../actionTypes";


export const setAllRequests = (arrayOfRequests) => {
    return{
        type: SET_REQUESTS,
        payload: arrayOfRequests
    }
}

export const setAppliedRequests = (arrayOfAppliedRequests) => {
    return{
        type: SET_APPLIED_REQUESTS,
        payload: arrayOfAppliedRequests
    }
}



export const getAllRequestsAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`donor/search/?search_param=&type=requests`);
        const {data} = response
        console.log("data", data)
        dispatch(setAllRequests(data))
        console.log('in the action')
        return response
    } catch (error) {
        console.log("error message", error.response);
        console.log("error", error)
        return error
    }
}

export const getAllAppliedToRequestsAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`donor/requests/applied/`);
        const {data} = response
        console.log("Applied requests", data)
        dispatch(setAppliedRequests(data))
        return response
    } catch (error) {
        console.log("error message", error.response);
        console.log("error", error)
        return error
    }
}
