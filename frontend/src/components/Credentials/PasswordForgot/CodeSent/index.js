import { Link } from "react-router-dom";
import React, {useState} from "react";
import styled from "styled-components";
import { PageContainer } from "../../../../style/GlobalWrappers";
import { MiddleTitle } from "../../../../style/GlobalTitles";
import { DarkBlueButton } from "../../../../style/GlobalButtons";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import registerImg from "../../../../assets/icons/success_register.svg";

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
  margin-bottom: 16px;
`;

const CodeSentReset = ({ registrationReducer: { isDonor }, dispatch, errorReducer: { error } }) => {

  return (
    <PageWrapper>
      <NiceImage src={registerImg} />
          <Title>If the email is valid we've sent you the validation code.</Title>
        <Link to={`/auth/password/reset/validation`}>
                <DarkBlueButton>Next</DarkBlueButton>
        </Link>
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

export default connect(mapStateToProps)(CodeSentReset);
