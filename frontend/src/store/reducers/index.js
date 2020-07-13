import {combineReducers} from "redux";
import { authReducer } from "./authReducer";
import { searchReducer } from "./searchReducer";
import { errorReducer } from "./errorReducer";
import { userProfileReducer } from "./userProfileReducer";

export const rootReducer = combineReducers({
    authReducer,
    errorReducer,
    searchReducer,
    userProfileReducer,
});
