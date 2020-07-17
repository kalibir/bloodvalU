import Axios from "../../axios";
import { SET_TESTS } from "../actionTypes";

export const setAllTests = (arrayOfTests) => {
  return {
    type: SET_TESTS,
    payload: arrayOfTests,
  };
};

export const getRequestsOfSeekerAction = () => async (dispatch) => {
  try {
    const response = await Axios.get(`seeker/tests/me/`);
    const { data } = response;
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
