import Axios from "../../axios";
import {
    ADD_REQUEST_TO_LIST,
    SET_REQUESTS,
    UPDATE_REQUEST_IN_ALL_REQUESTS,
} from "../actionTypes";


export const setAllRequests = (arrayOfRequests) => {
    return {
        type: SET_REQUESTS,
        payload: arrayOfRequests
    }
}


export const updateRequestInAll = (request) => {
    return {
        type: UPDATE_REQUEST_IN_ALL_REQUESTS,
        payload: request
    }
}

export const addRequestToAll = (request) => {
    return {
        type: ADD_REQUEST_TO_LIST,
        payload: request
    }
}


export const getAllRequestsAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`donor/search/?search_param=&type=requests`);
        const {data} = response
        dispatch(setAllRequests(data))
        return response
    } catch (error) {
        console.log("error message", error.response);
        console.log("error", error)
        return error
    }
}

export const createBloodRequestAction = (requestData) => async (dispatch) => {
    try {
        const response = await Axios.post(`request/new/`, requestData);
        const {data} = response
        dispatch(addRequestToAll(data))
        return response
    } catch (error) {
        console.log("error message", error.response);
        console.log("error ", error);
        return error
    }
}

export const getAllAppliedToRequestsAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`donor/search/?search_param=&type=applied`);
        const {data} = response
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
        dispatch(updateRequestInAll(data))
        return response
    } catch (error) {
        console.log("error message", error.response);
        console.log("error", error)
        return error
    }
}

export const getSeekerBloodRequestsAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`seeker/search/?request_status=`);
        const {data} = response
        dispatch(setAllRequests(data))
        return response
    } catch (error) {
        console.log("error message", error.response);
        return error
    }
}

export const getApplicantsOfRequestAction = (requestID) => async (dispatch) => {
    console.log("getting applicants")
    try {
        const response = await Axios.get(`request/applicants/${requestID}/`);
        console.log("applicants of request", response.data)
        return response
    } catch (error) {
        console.log("error message", error.response);
        return error
    }
}


export const assignApplicantAsSelectedDonor = (requestID, donorID) => async (dispatch) => {
    try {
        const response = await Axios.post(`request/${requestID}/assign/${donorID}/`);
        updateRequestInAll(response.data)
        return response
    } catch (error) {
        console.log("error message", error.response);
        return error
    }
}
