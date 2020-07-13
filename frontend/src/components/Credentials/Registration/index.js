import React, { useState } from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import { BigButton } from "../../../style/GlobalButtons";
import { SmallTitleHr, MainTitle } from "../../../style/GlobalTitles";
import { BaseInput } from "../../../style/GlobalInputs";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { sendCode, validate } from "../../../store/actions/registrationActions";

const SignUpWrapper = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${rem("47px")};
`;

const SignUpFormContainer = styled.form`
  flex-direction: column;
  display: flex;
  height: ${rem("420px")};
  width: ${rem("350px")};
  justify-content: center;
  align-items: center;
  height: auto;
  margin-bottom: ${rem("200px")};
`;

const SignUpButton = styled(BigButton)`
  margin-top: ${rem("30px")};
`;

const SignUpTitle = styled(MainTitle)`
  margin-bottom: ${rem("16px")};
`;

const SignUpTitleHr = styled(SmallTitleHr)`
  margin-bottom: ${rem("20px")};
`;

const ErrorPlaceholder = styled.div`
  width: ${rem("340px")};
  height: ${rem("52px")};
`;

const SignUpInput = styled(BaseInput)`
  background: #ffffff;
  box-sizing: border-box;
  width: ${rem("340px")};
  margin-bottom: ${rem("20px")};

  ::placeholder {
    font-weight: bold;
  }
`;

const SignUp = (props) => {
  const history = useHistory();
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
  };

  return (
    <SignUpWrapper>
      <SignUpFormContainer onSubmit={handleSubmit}>
        <SignUpTitle>Registration</SignUpTitle>
        <SignUpTitleHr></SignUpTitleHr>
        <ErrorPlaceholder></ErrorPlaceholder>
        <SignUpInput
          onChange={(e) => onChangeHandler(e, "email")}
          placeholder="E-Mail address"
          type="email"
          required
        />
        <SignUpButton type="submit">Register</SignUpButton>
      </SignUpFormContainer>
    </SignUpWrapper>
  );
};

export default SignUp;
