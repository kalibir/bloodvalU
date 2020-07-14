import React from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {connect, useDispatch} from "react-redux";
import {PageContainer} from "../../../style/GlobalWrappers";
import {BigInput, SmallInput} from "../../../style/GlobalInputs";
import {MiddleTitle, SmallTitle} from "../../../style/GlobalTitles";
import {DarkBlueButton} from "../../../style/GlobalButtons";

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

const ForgotContainer = styled.div`
    height: ${rem("48px")};
    display: flex;
    align-items: center;
`;

const ForgotPassword = styled.p`
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


const Login = (props) => {
    /*const { authReducer } = props;
  console.log("authReducer", authReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  console.log("loginInfo", loginInfo);
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
    console.log("in the submit");
    const response = await dispatch(sendLoginAction(loginInfo));
    if (response.status < 300) {
      history.push("/");
    }
  };*/

    return (
        <PageWrapper>
                <FormWrapper>
                        <RegistrationTitle>Login</RegistrationTitle>
                        <SmallTitle>Email</SmallTitle>
                        <EmailInput placeholder="example@email.com" type="email" required/>
                        <SmallTitle>Password</SmallTitle>
                        <EmailInput placeholder="***********" type="password" required/>
                        <ButtonWrapper>
                            <DarkBlueButton>Login</DarkBlueButton>
                            <ForgotContainer>
                                <ForgotPassword>Forgot password</ForgotPassword>
                            </ForgotContainer>
                        </ButtonWrapper>
                </FormWrapper>
        </PageWrapper>
   );
};


const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(Login);