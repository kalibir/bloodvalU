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

const CheckBox = styled.input``

const CheckboxWrapper = styled.div``

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
    const [hasAgreed, setHasAgreed] = useState(false)
    console.log("hasAgreed", hasAgreed)

    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setUserInfo({...userInfo, [property]: value});
    };

    const handleCheck = () => {
        setHasAgreed(!hasAgreed)
    }

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
                    <Text>
                        <p>1. I agree that I'm aged between <strong>18</strong> and <strong>70</strong>.</p>
                        <p><br/>2. I agree that I weigh more than <strong>50kg</strong>.</p>
                        <p><br/>3. I agree that I haven't tested positive for <strong>hepatitis B</strong> or <strong>hepatitis
                            C</strong>, lived with or had sexual contact in the past 12 months with anyone who has
                            hepatitis B or symptomatic <strong>hepatitis C</strong>.</p>
                        <p>&nbsp;</p>
                        <p>4. I agree that I have not spent a cumulative period of 6 months or<br/> more in the United
                            Kingdom between <strong>1 January 1980</strong><br/> and <strong>31 December 1996</strong>.
                        </p>
                        <p>&nbsp;</p>
                        <p>5. I agree that I haven't&nbsp;spent five years or more in France or Ireland
                            between <strong>1980</strong> and <strong>2001</strong>.</p>
                        <p>&nbsp;</p>
                        <p>6. I agree that I haven't undergone any <strong>major</strong> surgical procedures&nbsp;in
                            the last 12 months.</p>
                        <p>&nbsp;</p>
                        <p>7. I agree that I haven't had a tattoo in the past&nbsp;<strong>3</strong>&nbsp;months or
                            received a blood transfusion (except with your own blood) in the past&nbsp;
                            <strong>3</strong>&nbsp;months.</p>
                        <p>&nbsp;</p>
                        <p>8. I agree&nbsp;that I have never tested positive for the <strong>AIDS</strong> virus.</p>
                        <p><br/><br/></p>

                        <p>I agree: </p>
                        <CheckBox onClick={handleCheck} type="checkbox" defaultChecked={hasAgreed}/>
                    </Text>
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