import React from "react";
//import Login from "./Login";
import {Route} from "react-router-dom";
//import Verification from "./Verification";
import RegistrationSeeker from "./RegistrationSeeker";
//import SignUpSent from "./RegistrationSent";

const Credentials = (props) => {
    return (
        <>
            {/*<Route path="/auth/login" exact component={Login}/>*/}
            {/*<Route path="/auth/signup" exact component={SignUp}/>*/}
            <Route path="/auth/registration/seeker" exact component={RegistrationSeeker}/>
            {/*<Route path="/auth/signup/sent" exact component={SignUpSent}/>*/}
            {/*<Route path="/auth/signup/validation" exact component={Verification}/>*/}
        </>
    )
};

export default Credentials;
