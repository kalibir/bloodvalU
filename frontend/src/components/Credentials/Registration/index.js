import React, {useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {connect} from "react-redux";
import {ErrorPlaceholder, MiddleTitle, SmallTitle} from "../../../style/GlobalTitles";
import {BigInput} from "../../../style/GlobalInputs";
import {DarkBlueButton} from "../../../style/GlobalButtons";
import {PageContainer} from "../../../style/GlobalWrappers";
import {useHistory} from "react-router";
import {sendCode, setEmail} from "../../../store/actions/registrationActions";
import {resetError} from "../../../store/actions/errorActions";
import ButtonSpinner from "../../ButtonSpinner";

const PageWrapper = styled(PageContainer)`
    height: 78.2vh;
`;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 90px;
`;

const EmailInput = styled(BigInput)`
    margin-top: 9px;
    margin-bottom: 32px;
`;

const RegistrationTitle = styled(MiddleTitle)`
    margin-bottom: 23px;
`;

const RegButton = styled(DarkBlueButton)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Error = styled(ErrorPlaceholder)``


const Registration = ({registrationReducer, dispatch, errorReducer:{error}}) => {

    const history = useHistory();

    const [userInfo, setUserInfo] = useState({
        email: "",
    });
    const [showSpinner, setShowSpinner] = useState(false);

    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setUserInfo({...userInfo, [property]: value});
    };

    const handleSubmit = async (e) => {
        setShowSpinner(true)
        e.preventDefault();
        dispatch(resetError())
        const response = await dispatch(sendCode(userInfo));
        if (response.status < 300) {
            setShowSpinner(false)
            dispatch(setEmail(userInfo.email))
            history.push("/auth/signup/sent");
        }
    };


    return (
        <PageWrapper>
            <FormWrapper onSubmit={handleSubmit}>
                <RegistrationTitle>Registration</RegistrationTitle>
                {error ? <Error><p>{error}</p></Error> : null}
                <SmallTitle>Email</SmallTitle>
                <EmailInput onChange={(e) => onChangeHandler(e, "email")} placeholder="email" type="email" required/>
                <RegButton>{showSpinner ? <ButtonSpinner/> : "Register"}</RegButton>
            </FormWrapper>
        </PageWrapper>
    );
};


const mapStateToProps = (state) => {
    return {
        registrationReducer: state.registrationReducer,
        errorReducer: state.errorReducer,
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(Registration);