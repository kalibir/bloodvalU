import Axios from "../../axios";
import {SET_TESTS} from "../actionTypes";


export const setAllTests = (arrayOfTests) => {
    return{
        type: SET_TESTS,
        payload: arrayOfTests
    }
}
