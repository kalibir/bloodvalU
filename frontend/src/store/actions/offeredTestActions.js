import Axios from "../../axios";
import {BUY_TEST, SET_TESTS, UPDATE_REQUEST_IN_ALL_REQUESTS} from "../actionTypes";
import {updateRequestInAll} from "./bloodRequestActions";


export const setAllTests = (arrayOfTests) => {
    return{
        type: SET_TESTS,
        payload: arrayOfTests
    }
}

export const updateTestInAll = (request) => {
    return{
        type: BUY_TEST,
        payload: request
    }
}

export const buyTestAction = (request_id) => async (dispatch) => {
    try {
        const response = await Axios.post(`tests/buy/${request_id}/`);
        const {data} = response
        console.log("Buy test response", data)
        dispatch(updateTestInAll(data))
        return response
    } catch (error) {
        console.log("error message", error.response);
        console.log("error", error)
        return error
    }
}
