import Axios from "../../axios";
import {
    ADD_REQUEST_TO_LIST, REMOVE_REQUEST_FROM_LIST,
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

export const removeRequest = (requestID) => {
    return {
        type: REMOVE_REQUEST_FROM_LIST,
        payload: requestID
    }
}


export const getAllRequestsAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`donor/search/?search_param=&type=requests`);
        const {data} = response
        dispatch(setAllRequests(data))
        return response
    } catch (error) {
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
        return error
    }
}

export const getSeekerBloodRequestsAction = (status) => async (dispatch) => {
    try {
        const response = await Axios.get(`seeker/search/?request_status=${status}`);
        const {data} = response
        dispatch(setAllRequests(data))
        return response
    } catch (error) {
        return error
    }
}

export const getApplicantsOfRequestAction = (requestID) => async (dispatch) => {
    try {
        const response = await Axios.get(`request/applicants/${requestID}/`);
        return response
    } catch (error) {
        return error
    }
}


export const assignApplicantAsSelectedDonor = (requestID, donorID) => async (dispatch) => {
    try {
        const response = await Axios.post(`request/${requestID}/assign/${donorID}/`);
        dispatch(updateRequestInAll(response.data))
        return response
    } catch (error) {
        return error
    }
}

export const markRequestAsCompleteAction = (requestID) => async (dispatch) => {
    try {
        const response = await Axios.post(`request/complete/${requestID}/`);
        dispatch(updateRequestInAll(response.data))
        return response
    } catch (error) {
        return error
    }
}

export const deleteRequestAction = (requestID) => async (dispatch) => {
    try {
        const response = await Axios.delete(`request/${requestID}/`);
        dispatch(removeRequest(Number(requestID)))
        return response
    } catch (error) {
        return error
    }
}

export const editRequestAction = (requestID, data) => async (dispatch) => {
    try {
        const response = await Axios.patch(`request/${requestID}/`, data);
        dispatch(updateRequestInAll(response.data))
        return response
    } catch (error) {
        return error
    }
}