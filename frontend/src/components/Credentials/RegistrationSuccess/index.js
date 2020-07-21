import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { PageContainer } from "../../../style/GlobalWrappers";
import { MiddleTitle } from "../../../style/GlobalTitles";
import { DarkBlueButton } from "../../../style/GlobalButtons";
import rem from "polished/lib/helpers/rem";

const PageWrapper = styled(PageContainer)`
  height: 78.2vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled(MiddleTitle)`
  margin-bottom: 24px;
`;

const NiceImage = styled.div`
  height: 100px;
  width: 100px;
  color: black;
  border: 1px solid mediumpurple;
`;

const LinkContainer = styled.div`
  height: ${rem("48px")};
  display: flex;
  align-items: center;
`;

const LoginLink = styled(Link)`
  font-weight: 600;
  font-size: 16px;
  line-height: 32px;
  text-decoration-line: underline;
  color: #3e465f;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 265px;
  height: 64px;
  text-align: center;
`;

const CodeSent = () => {
  return (
    <PageWrapper>
      <NiceImage>Some hearts</NiceImage>
      <TextContainer>
        <Title>
          Your registration is
          <br /> now complete.
        </Title>
      </TextContainer>
      <LinkContainer>
        <LoginLink to="/auth/login">Login here</LoginLink>
      </LinkContainer>
    </PageWrapper>
  );
};

export default CodeSent;
