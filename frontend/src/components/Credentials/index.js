import React from "react";
import Login from "./Login";
import {Route} from "react-router-dom";
import Registration from "./Registration";
import CodeSent from "./CodeSent";
import RegistrationSuccess from "./RegistrationSuccess"
import CreateBaseUser from "./CreateBaseUser";
import CreateSeekerProfile from "./CreateSeekerProfile";
import CreateDonorProfile from "./CreateDonorProfile";
import ResetEmailInput from "./PasswordForgot/EmailInput";
import CodeSentReset from "./PasswordForgot/CodeSent";
import ResetValidation from "./PasswordForgot/CodeValidation";

const Credentials = (props) => {
    return (
        <>
            <Route path="/auth/signup/sent" exact component={CodeSent}/>
            <Route path="/auth/signup/validation/" exact component={CreateBaseUser}/>
            <Route path="/auth/signup/donor-profile/" exact component={CreateDonorProfile}/>
            <Route path="/auth/signup/seeker-profile/" exact component={CreateSeekerProfile}/>
            <Route path="/auth/login" exact component={Login}/>
            <Route path="/auth/signup" exact component={Registration}/>
            <Route path="/auth/signup/completed" exact component={RegistrationSuccess}/>
            <Route path="/auth/password/reset/email" exact component={ResetEmailInput}/>
            <Route path="/auth/password/reset/sent" exact component={CodeSentReset}/>
            <Route path="/auth/password/reset/validation" exact component={ResetValidation}/>
        </>
    )
};

export default Credentials;
