import {combineReducers} from "redux";
import { authReducer } from "./authReducer";
import { searchReducer } from "./searchReducer";
import { errorReducer } from "./errorReducer";
import { userProfileReducer } from "./userProfileReducer";
import { registrationReducer } from "./registrationReducer";
import { profilesReducer } from "./profilesReducer";

export const rootReducer = combineReducers({
    authReducer,
    errorReducer,
    searchReducer,
    registrationReducer,
    userProfileReducer,
    profilesReducer,
});
