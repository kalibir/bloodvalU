import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import rem from "polished/lib/helpers/rem";
import { BaseStatusButton } from "../../../style/GlobalButtons/";
import { useDispatch } from "react-redux";

const ColorDebug = false; //at true all element get colored background for checking

const CertificateWrapper = styled.div`
  width: 100%;
  background-color: ${ColorDebug ? "lightslategrey" : ""};
`;

// STYLES FOR ANIMATION
const heightAnimation = keyframes`
  from { max-height: 0; overflow: hidden;}
  to{ max-height: 300px; transition: max-height 5s;}
`;

const CertificateBar = styled.div`
  display: grid;
  width: 100%;
  height: 48px;
  grid-template-areas: "text download button arrow";
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;
  align-items: center;
  grid-gap: 8px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  grid-area: text;
  display: flex;
  height: 35px;
  grid-area: text;
  padding: 24px;
  align-items: center;
`;

const DownloadButtonWrapper = styled.div`
  grid-area: download;
`;

const DownloadButton = styled(BaseStatusButton)`
  background-color: #121232;
  width: 175px;
`;

const ButtonWrapper = styled.div`
  grid-area: button;
  display: flex;
  justify-content: center;
`;

const BlueButton = styled(BaseStatusButton)`
  background-color: #2196f3;
  width: 82px;
`;

const RedButton = styled(BaseStatusButton)`
  background-color: #d33449;
  width: 82px;
`;

const BarArrowWrapper = styled(ButtonWrapper)`
  grid-area: arrow;
  justify-self: end;
  margin-right: 24px;
`;

const BarArrowRight = styled.i`
  border: solid #757575;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
`;

const SeekerInfo = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 23px;
  padding-right: 27px;
  color: #121232;
  border: 1px solid #d3d4d8;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  animation: 1s ${heightAnimation};
`;

const SeekerInfoHeader = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const CompanyName = styled.p`
  font-size: 18px;
`;

const SeekerInfoBodyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SeekerInfoBody = styled.ul`
  width: 100%;
  margin-top: 16px;
`;

const SeekerInfoBodyLine = styled.li`
  width: 100%;
  margin-bottom: 8px;
  list-style: none;
  font-size: 13px;
`;

const ProfilePicPlaceholder = styled.div`
  width: ${rem("100px")};
  height: 100%;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  img {
    width: ${rem("100px")};
    height: ${rem("100px")};
  }
`;

const SeekerCertificateBar = ({ profile: { id, name, phone, street, zip_code, email, logo, is_valid }, handleVerifyCertificate }) => {
  const [showSeeker, setSeekerInfo] = useState(false);
  const showSeekerHandler = (event) => {
    setSeekerInfo(!showSeeker);
  };


  return (
    <CertificateWrapper>
      <CertificateBar>
        <TextWrapper onClick={showSeekerHandler}> {name} </TextWrapper>
        <DownloadButtonWrapper>
          <DownloadButton>Download Certificate</DownloadButton>
        </DownloadButtonWrapper>
        <ButtonWrapper>
          {is_valid ? (
            <RedButton onClick={e => handleVerifyCertificate(e, id)}>Unverify</RedButton>
          ) : (
            <BlueButton onClick={e => handleVerifyCertificate(e, id)}>Verify</BlueButton>
          )}
        </ButtonWrapper>
        <BarArrowWrapper onClick={showSeekerHandler}>
          <BarArrowRight
            style={showSeeker ? { transform: "rotate(45deg)" } : { transform: "rotate(-45deg)" }}
          />
        </BarArrowWrapper>
      </CertificateBar>
      {showSeeker ? (
        <>
          <SeekerInfo>
            <SeekerInfoHeader>
              <CompanyName>{name}</CompanyName>
            </SeekerInfoHeader>
            <SeekerInfoBodyWrapper>
              <SeekerInfoBody>
                <SeekerInfoBodyLine>Phone: {phone}</SeekerInfoBodyLine>
                <SeekerInfoBodyLine>Address: {street}</SeekerInfoBodyLine>
                <SeekerInfoBodyLine>Zip Code: {zip_code}</SeekerInfoBodyLine>
              </SeekerInfoBody>
              <SeekerInfoBody>
                <SeekerInfoBodyLine>Address: {street}</SeekerInfoBodyLine>
                <SeekerInfoBodyLine>E-mail: {email}</SeekerInfoBodyLine>
              </SeekerInfoBody>
              <ProfilePicPlaceholder>
                <img src={logo} />
              </ProfilePicPlaceholder>
            </SeekerInfoBodyWrapper>
          </SeekerInfo>
        </>
      ) : null}
    </CertificateWrapper>
  );
};

export default SeekerCertificateBar;
