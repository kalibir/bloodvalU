import React, { useState } from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import { ErrorPlaceholder, MiddleTitle, SmallTitle } from "../../../style/GlobalTitles";
import { BigInput, Select, SmallInput } from "../../../style/GlobalInputs";
import { DarkBlueButton, WhiteButton } from "../../../style/GlobalButtons";
import { PageContainer } from "../../../style/GlobalWrappers";
import { connect } from "react-redux";
import { validate } from "../../../store/actions/registrationActions";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { resetError } from "../../../store/actions/errorActions";
import { sendLoginAction } from "../../../store/actions/loginActions";
import {FaEye} from "react-icons/fa";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  //background-color: darkorange;
`;

const FormContainer = styled.div`
  display: flex;
  flex-flow: column;
  //background-color: burlywood;
`;

const InputPairContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rem("40px")};
  width: ${rem("352px")};
`;

const TitleContainer = styled(InputPairContainer)`
  justify-content: flex-start;
  margin-top: ${rem("48px")};
`;

const MiddleTitle500 = styled(MiddleTitle)`
  font-weight: 500;
`;

const ButtonContainer = styled(InputPairContainer)`
  justify-content: flex-end;
  margin: 0;
  //background-color: rosybrown;
`;

const PasswordContainer = styled.div`
    //margin-bottom: 32px;
    height: ${rem("50px")};
    width: ${rem("352px")};
    display: flex;
    justify-content: space-between;
    background: #FFFFFF;
    border: 1px solid #A1A4B1;
    border-radius: 4px;
    outline: none;
`;

const PasswordInput = styled(BigInput)`
    width: 87%;
    border: none;
    // :invalid{
    //    border:1px solid #ea0000;
    //  }
    // :not(placeholder-shown):invalid{
    //  border:1px solid #ea0000;
    //}
`;


const RepeatPasswordInput = styled(BigInput)`
    width: 87%;
    border: none;
`;

const EyeContainer = styled.div`
    height: ${rem("48px")};
    width: 13%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: ${rem("15px")};
    color: ${(props) => (props.active ? "#8B90A0;" : props.repeat_active ? "#8B90A0;" : "#232735")};
`;

const InputTitle = styled(SmallTitle)`
  margin-bottom: ${rem("8px")};
  font-weight: 500;
`;

const Error = styled(ErrorPlaceholder)``;

const CreateBaseUser = ({
  registrationReducer: { isDonor, email },
  dispatch,
  errorReducer: { error },
}) => {
  const { push } = useHistory();

  const [userInfo, setUserInfo] = useState({
    email: `${email ? email : ""}`,
    code: "",
    password: "",
    password_repeat: "",
    is_donor: `${isDonor}`,
  });
  const [seePassword, setSeePassword] = useState(false)
  const [seeRepeatPassword, setRepeatSeePassword] = useState(false)

  const onChangeHandler = (event, property) => {
    const value = event.currentTarget.value;
    setUserInfo({ ...userInfo, [property]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetError());
    const response = await dispatch(validate(userInfo));
    if (response.status < 300) {
      const loginInfo = { email: userInfo.email, password: userInfo.password };
      const response = await dispatch(sendLoginAction(loginInfo));
      if (response.status < 300) {
        push(
          `${isDonor === "False" ? "/auth/signup/seeker-profile/" : "/auth/signup/donor-profile/"}`
        );
      }
    }
  };

  return (
    <PageContainer>
      <FormWrapper onSubmit={handleSubmit}>
        <FormContainer>
          <TitleContainer>
            <MiddleTitle500>Create an Account</MiddleTitle500>
          </TitleContainer>

          <InputPairContainer>
            <div>
              <InputTitle>E-mail</InputTitle>
              <Error>
                <p>{error === ("1" || "email") ? "Enter a valid email address" : null}</p>
              </Error>
              <BigInput
                value={userInfo.email}
                type="email"
                placeholder="sherlock@holmes.com"
                onChange={(e) => onChangeHandler(e, "email")}
                required
              />
            </div>
          </InputPairContainer>

          <InputPairContainer>
            <div>
              <InputTitle>Password</InputTitle>
              <Error>
                <p>{error === "3" ? "Passwords do not match!" : null}</p>
              </Error>
              <PasswordContainer>
                <PasswordInput
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                type={seePassword ? "text" : "password"}
                name="new-password"
                placeholder="password"
                onChange={(e) => onChangeHandler(e, "password")}
                required
              />
              <EyeContainer active={seePassword} onClick={(e) => setSeePassword(!seePassword)}><FaEye /></EyeContainer>
              </PasswordContainer>
            </div>
          </InputPairContainer>

          <InputPairContainer>
            <div>
              <InputTitle>Repeat password</InputTitle>
              <PasswordContainer>
                <RepeatPasswordInput
                type={seeRepeatPassword ? "text" : "password"}
                name="new-password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                placeholder="repeat password"
                onChange={(e) => onChangeHandler(e, "password_repeat")}
                required
              />
              <EyeContainer repeat_active={seeRepeatPassword} onClick={(e) => setRepeatSeePassword(!seeRepeatPassword)}><FaEye /></EyeContainer>
              </PasswordContainer>
            </div>
          </InputPairContainer>

          <InputPairContainer>
            <div>
              <InputTitle>Verification code</InputTitle>
              <Error>
                <p>{error === "2" ? "Validation code is incorrect" : null}</p>
              </Error>
              <BigInput
                type="text"
                inputmode="numeric"
                placeholder="12345"
                onChange={(e) => onChangeHandler(e, "code")}
                required
              />
            </div>
          </InputPairContainer>

          <ButtonContainer>
            <DarkBlueButton>Create</DarkBlueButton>
          </ButtonContainer>
        </FormContainer>
      </FormWrapper>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    registrationReducer: state.registrationReducer,
    errorReducer: state.errorReducer,
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(CreateBaseUser);
