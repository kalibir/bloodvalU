import Axios from "../../axios";
import {
    SET_REQUESTS,
    UPDATE_REQUEST_IN_ALL_REQUESTS,
} from "../actionTypes";


export const setAllRequests = (arrayOfRequests) => {
    return{
        type: SET_REQUESTS,
        payload: arrayOfRequests
    }
}


export const updateRequestInAll = (request) => {
    return{
        type: UPDATE_REQUEST_IN_ALL_REQUESTS,
        payload: request
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
        const response = await Axios.get(`donor/search/?search_param=&type=applied`);
        const {data} = response
        console.log("Applied requests", data)
        dispatch(setAllRequests(data))
        return response
    } catch (error) {
        console.log("error message", error.response);
        console.log("error", error)
        return error
    }
}


export const applyToRequestActionInAll = (request_id) => async (dispatch) => {
    try {
        const response = await Axios.post(`request/apply/${request_id}/`);
        const {data} = response
        console.log("Applied request", data)
        dispatch(updateRequestInAll(data))
        return response
    } catch (error) {
        console.log("error message", error.response);
        console.log("error", error)
        return error
    }
}
