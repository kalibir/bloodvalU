import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { PageContainer } from "../../../style/GlobalWrappers";
import { MiddleTitle } from "../../../style/GlobalTitles";
import { DarkBlueButton } from "../../../style/GlobalButtons";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import registerImg from "../../../assets/icons/success_register.svg";

const PageWrapper = styled(PageContainer)`
  height: 78.2vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled(MiddleTitle)`
  margin-bottom: 24px;
`;

const NiceImage = styled.img`
  height: 100px;
  width: 100px;
  color: black;
`;

const CodeSent = ({ registrationReducer: { isDonor }, dispatch, errorReducer: { error } }) => {
  return (
    <PageWrapper>
      <NiceImage src={registerImg} />
      <Title>Thanks for your registration. Please check your email for the validation code.</Title>
      <Link to={`/auth/signup/validation/`}>
        <DarkBlueButton>Next</DarkBlueButton>
      </Link>
    </PageWrapper>
  );
};
const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    registrationReducer: state.registrationReducer,
    errorReducer: state.errorReducer,
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(CodeSent);
