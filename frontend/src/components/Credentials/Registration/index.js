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
`;

const DisclaimerWrapper = styled.div`
  width: 350px;
  max-height: 400px;
  overflow: auto;
`

const Text = styled.p``


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


const Registration = ({registrationReducer, dispatch, errorReducer: {error}}) => {

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
                <DisclaimerWrapper>
                    <Text>1. Are you aged between 16-70 years?
                        Yes.
                        No. You may not be able to give blood. Please contact us.
                        2. WA/QLD aged 16-17 years?
                        Yes. Parental Consent Form required.
                        No.
                        3. Do you weigh at least 50 kg?
                        Yes.
                        No. You may not be able to give blood. Please contact us.
                        4. At this time, are you feeling fit and healthy?
                        Yes.
                        No. At this time you may not be able to give blood. Please contact us.
                        5. Have you spent a cumulative period of 6 months or
                        more in the United Kingdom between 1 January 1980
                        and 31 December 1996?
                        Yes. You may not be able to give blood. Please contact us.
                        No.
                        6. In the last 12 months, have you undergone any
                        surgical procedures?
                        Yes. You may not be able to give blood. Please contact us.
                        No.
                        7. In the 3 days after your appointment do you intend to
                        participate in any activity which would place you or
                        others at risk of injury if you were to become unwell
                        after donating, such as driving public transport,
                        operating heavy machinery, underwater diving,
                        piloting a plane or other activities?
                        Yes. You may not be able to give blood. Please contact us.
                        No.</Text>
                </DisclaimerWrapper>
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