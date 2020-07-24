import Axios from "../../axios";
import {
    BUY_TEST,
    SET_TESTS,
    UPDATE_REQUEST_IN_ALL_REQUESTS,
    ADD_TEST_TO_LIST, REMOVE_TEST_FROM_LIST,
} from "../actionTypes";
import {updateRequestInAll} from "./bloodRequestActions";

export const setAllTests = (arrayOfTests) => {
    return {
        type: SET_TESTS,
        payload: arrayOfTests,
    };
};

export const addTestToAll = (test) => {
    return {
        type: ADD_TEST_TO_LIST,
        payload: test,
    };
};

export const updateTestInAll = (test) => {
    return {
        type: BUY_TEST,
        payload: test,
    };
};

export const removeTest = (testID) => {
    return {
        type: REMOVE_TEST_FROM_LIST,
        payload: testID
    };
};

export const buyTestAction = (test_id) => async (dispatch) => {
    try {
        const response = await Axios.post(`tests/buy/${test_id}/`);
        const {data} = response;
        console.log("Buy test response", data);
        dispatch(updateTestInAll(data));
        return response;
    } catch (error) {
        console.log("error message", error.response);
        console.log("error", error);
        return error;
    }
};

export const getRequestsOfSeekerAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`seeker/tests/me/`);
        const {data} = response;
        console.log("data", data);
        dispatch(setAllTests(data));
        console.log("in the action");
        return response;
    } catch (error) {
        console.log("error message", error.response);
        console.log("error", error);
        return error;
    }
};

export const createTestRequestAction = (requestData) => async (dispatch) => {
    try {
        const response = await Axios.post(`tests/new/`, requestData);
        const {data} = response;
        dispatch(addTestToAll(data));
        return response;
    } catch (error) {
        console.log("error message", error.response);
        console.log("error ", error);
        return error;
    }
};

export const deleteTestAction = (testID) => async (dispatch) => {
    try {
        const response = await Axios.delete(`tests/${testID}/`);
        dispatch(removeTest(Number(testID)))
        return response
    } catch (error) {
        console.log("error in delete test action", error);
        return error
    }
}

export const getCustomersAction = (testIdObj) => async (dispatch) => {
    try {
        const response = await Axios.post(`tests/customers/`, testIdObj);
        console.log("response", response.data)
        return response
    } catch (error) {
        console.log("error in the getCustomersAction", error.response);
        return error
    }
}