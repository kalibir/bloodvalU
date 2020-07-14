import React from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {connect, useDispatch} from "react-redux";
import {MiddleTitle, SmallTitle} from "../../../style/GlobalTitles";
import {BigInput} from "../../../style/GlobalInputs";
import {DarkBlueButton} from "../../../style/GlobalButtons";
import {PageContainer} from "../../../style/GlobalWrappers";

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


const Registration = (props) => {

    /*const history = useHistory();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  console.log(userInfo);
  const onChangeHandler = (event, property) => {
    const value = event.currentTarget.value;
    setUserInfo({ ...userInfo, [property]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(sendCode(userInfo));

    if (response.status < 300) {
      history.push("/auth/signup/sent");
    } else {
      console.log("error", response);
    }
  };*/


    return (
        <PageWrapper>
                <FormWrapper>
                        <RegistrationTitle>Registration</RegistrationTitle>
                        <SmallTitle>Email</SmallTitle>
                        <EmailInput placeholder="email" type="email" required/>
                        <DarkBlueButton>Register</DarkBlueButton>
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

export default connect(mapStateToProps)(Registration);