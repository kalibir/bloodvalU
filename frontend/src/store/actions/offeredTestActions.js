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
    const { data } = response;
    dispatch(updateTestInAll(data));
    return response;
  } catch (error) {
    return error;
  }
};

export const getRequestsOfSeekerAction = () => async (dispatch) => {
  try {
    const response = await Axios.get(`seeker/tests/me/`);
    const { data } = response;
    dispatch(setAllTests(data));
    return response;
  } catch (error) {
    return error;
  }
};

export const createTestRequestAction = (requestData) => async (dispatch) => {
  try {
    const response = await Axios.post(`tests/new/`, requestData);
    const { data } = response;
    dispatch(addTestToAll(data));
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteTestAction = (testID) => async (dispatch) => {
  try {
    const response = await Axios.delete(`tests/${testID}/`);
    dispatch(removeTest(Number(testID)))
    return response
  } catch (error) {
    return error
  }
}

export const editTestAction = (testID, testData) => async (dispatch) => {
  try {
    const response = await Axios.patch(`tests/${testID}/`, testData);
    const { data } = response;
    dispatch(updateTestInAll(data));
    return response
  } catch (error) {
    return error
  }
}

export const getCustomersAction = (testIdObj) => async (dispatch) => {
    try {
        const response = await Axios.post(`tests/customers/`, testIdObj);
        return response
    } catch (error) {
        return error
    }
}

export const uploadTestResultsAction = (data) => async (dispatch) => {
    try {
        const response = await Axios.post(`results/new/`, data);
        return response
    } catch (error) {
        return error
    }
}