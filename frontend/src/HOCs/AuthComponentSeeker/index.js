import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";

const authComponentSeeker = (WrappedComponent) => (props) => {
    const {push} = useHistory();
    const {
        state: {token, userObj},
    } = props;

    useEffect(() => {
        if (!token) push("/");
        else if (userObj && userObj.is_donor) {
            if (userObj.is_donor) push("/dashboard/donor")
            if (userObj.first_name === "") push("/auth/signup/donor-profile/")
        } else if (userObj && !userObj.is_donor) {
            if (userObj.name === "") push("/auth/signup/seeker-profile/")
        }

    }, [userObj]);

    return <WrappedComponent/>;
};

const mapStateToProps = (state) => {
    return {
        state: state.authReducer,
    };
};

export default compose(connect(mapStateToProps), authComponentSeeker);
