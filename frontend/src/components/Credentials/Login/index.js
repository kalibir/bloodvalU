import React, {useEffect, useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {connect, useDispatch} from "react-redux";
import {PageContainer} from "../../../style/GlobalWrappers";
import {BigInput, SmallInput} from "../../../style/GlobalInputs";
import {ErrorPlaceholder, MiddleTitle, SmallTitle} from "../../../style/GlobalTitles";
import {DarkBlueButton} from "../../../style/GlobalButtons";
import {sendLoginAction} from "../../../store/actions/loginActions";
import {useHistory} from "react-router";
import {resetError} from "../../../store/actions/errorActions";
import {Link} from "react-router-dom";
import {setIsLogin} from "../../../store/actions/userActions";
import { FaEye } from 'react-icons/fa';

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
    height: ${rem("50px")};
    :not(placeholder-shown):invalid{
      color: #a40000;
    }
`;

const PasswordContainer = styled.div`
    margin-top: 9px;
    margin-bottom: 32px;
    height: ${rem("50px")};
    width: ${rem("352px")};
    display: flex;
    justify-content: space-between;
    background: #FFFFFF;
    border: 1px solid #A1A4B1;
    border-radius: 4px;
    outline: none;
`

const PasswordInput = styled(BigInput)`
    margin-bottom: 32px;
    width: 80%;
    border: none;
    outline: none;
`;

const EyeContainer = styled.div`
    height: ${rem("48px")};
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: ${rem("15px")};
    color: ${(props) => (props.active ? "#8B90A0;" : "#232735")};
`

const RegistrationTitle = styled(MiddleTitle)`
    margin-bottom: 23px;
`;

const ForgotContainer = styled.div`
    height: ${rem("48px")};
    display: flex;
    align-items: center;
`;

const ForgotPassword = styled(Link)`
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
    text-decoration-line: underline;
    color: #3E465F;
    margin-left: 24px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: ${rem("352px")};
    height: ${rem("97px")};
`

const Error = styled(ErrorPlaceholder)`
`


const Login = ({errorReducer: {error}, authReducer: {authenticated, userObj}}) => {

    const {push} = useHistory();
    const dispatch = useDispatch();
    const [loginInfo, setloginInfo] = useState({
        email: "",
        password: "",
    });
    const [seePassword, setSeePassword] = useState(false)

    useEffect(()=> {
        dispatch(setIsLogin(false))
    }, [])

    useEffect(() => {
        if (authenticated && userObj && userObj.is_donor) push("/dashboard/donor")
        else if (authenticated && userObj && !userObj.is_donor) push("/dashboard/seeker")
    })

    const handleEmail = (e) => {
        const value = e.currentTarget.value;
        setloginInfo({
            ...loginInfo,
            email: value,
        });
    };

    const handlePassword = (e) => {
        const value = e.currentTarget.value;
        setloginInfo({
            ...loginInfo,
            password: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetError())
        const response = await dispatch(sendLoginAction(loginInfo));
        if (response.status < 300) {
            const profile = response.data.profile
            if (profile.is_staff) {
                push("/admin-panel")
            } else if (profile.is_donor) {
                profile.first_name === "" ?
                    push("/auth/signup/donor-profile/")
                    : push("/dashboard/donor")
            } else {
                profile.name === "" ?
                    push("/auth/signup/seeker-profile/")
                    : push("/dashboard/seeker")
            }
        }
    };


    return (
        <PageWrapper>
            <FormWrapper onSubmit={handleSubmit}>
                <RegistrationTitle>Login</RegistrationTitle>
                {error ? <Error><p>{error}</p></Error> : null}
                <SmallTitle htmlFor="email">Email</SmallTitle>
                <EmailInput id="email" name="email" autocomplete="email" onChange={handleEmail} placeholder="example@email.com" type="email" required autoFocus/>
                <SmallTitle  htmlFor="password">Password</SmallTitle>
                <PasswordContainer>
                    <PasswordInput id="password" name="current-password" onChange={handlePassword} placeholder="***********" type={seePassword ? "text" : "password"} required/>
                    <EyeContainer active={seePassword} onClick={(e) => setSeePassword(!seePassword)}><FaEye /></EyeContainer>
                </PasswordContainer>
                <ButtonWrapper>
                    <DarkBlueButton>Login</DarkBlueButton>
                    <ForgotContainer>
                        <ForgotPassword to={`/auth/password/reset/email`}>Forgot password</ForgotPassword>
                    </ForgotContainer>
                </ButtonWrapper>
            </FormWrapper>
        </PageWrapper>
    );
};


const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        errorReducer: state.errorReducer,
    };
};

export default connect(mapStateToProps)(Login);