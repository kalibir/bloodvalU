import {combineReducers} from "redux";
import { authReducer } from "./authReducer";
import { searchReducer } from "./searchReducer";
import { errorReducer } from "./errorReducer";
import { userProfileReducer } from "./userProfileReducer";
import { registrationReducer } from "./registrationReducer";

export const rootReducer = combineReducers({
    authReducer,
    errorReducer,
    searchReducer,
    registrationReducer,
    userProfileReducer,
});
