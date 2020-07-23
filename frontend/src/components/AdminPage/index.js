import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import rem from "polished/lib/helpers/rem";
import NumberFormat from "react-number-format";
import { PageContainer } from "../../style/GlobalWrappers";
import { BigInput } from "../../style/GlobalInputs";
import { DarkBlueButton } from "../../style/GlobalButtons";
import { BaseStatusButton } from "../../style/GlobalButtons/";
import GenericDonorTestCard from "../GenericDonorTestCard";
import GenericDonorRequestBar from "../GenericDonorRequestBar";
import { connect } from "react-redux";
import DonorProfileCardWide from "../GenericDonorProfileWide";
import { getAllSeekersAction } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { applyToRequestActionInAll } from "../../store/actions/bloodRequestActions";
import { searchAllRequestsAndTestsAction } from "../../store/actions/searchActions";
import { getLoggedInUserAction } from "../../store/actions/userActions";
import { bloodGroupTest } from "../../HelperFunctions";
import Spinner from "../../components/GenericSpinner";

const ColorDebug = false; //at true all element get colored background for checking

const PageWrapper = styled.div`
  margin-top: 32px;
  width: 100%;
  height: 100%;
  background-color: ${ColorDebug ? "darkorange" : ""};
`;

const DashboardContentContainer = styled.div`
  width: 100%;
  padding-left: 160px;
  padding-right: 160px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  background-color: ${ColorDebug ? "deepskyblue" : ""};
`;

const AdminText = styled.p`
  margin-bottom: 36px;
  width: 34%;
  color: #121232;
  font-weight: 500;
  font-size: ${rem("16px")};
  text-transform: capitalize;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: ${rem("40px")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rem("32px")};
  background-color: ${ColorDebug ? "darksalmon" : ""};
`;

const SearchInput = styled(BigInput)`
  width: 80%;
  height: ${rem("40px")};
`;

const SearchButton = styled(DarkBlueButton)`
  width: ${rem("96px")};
  height: ${rem("40px")};
`;

const CertificateContainer = styled.div`
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
  width: 100%;
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

const AdminPage = ({ dispatch, authReducer: { userObj } }) => {
  const [showSeeker, setSeekerInfo] = useState(false);
  const [active, setActive] = useState("requests");

  const showSeekerHandler = (event) => {
    setSeekerInfo(!showSeeker);
  };
  const [searchParams, setSearchParams] = useState("");

  const handleApply = (e) => {
    console.log("in the apply handler");
    dispatch(getAllSeekersAction(userObj));
  };

  const handleSearch = (event) => {
    dispatch(getAllSeekersAction(searchParams, active));
    setSearchParams("");
  };

  const handleSearchInput = (e) => {
    const value = e.currentTarget.value;
    setSearchParams(value);
  };

  return (
    <PageContainer>
      <PageWrapper>
        <DashboardContentContainer>
          <AdminText>Admin Panel</AdminText>
          <SearchContainer>
            <SearchInput onChange={handleSearchInput} placeholder="Search..." />
            <SearchButton onClick={handleSearch}>Search</SearchButton>
          </SearchContainer>
          <CertificateContainer>
            <CertificateBar>
              <TextWrapper onClick={showSeekerHandler}> {userObj.name} </TextWrapper>
              <DownloadButtonWrapper>
                <DownloadButton>Download Certificate</DownloadButton>
              </DownloadButtonWrapper>
              <ButtonWrapper>
                <BlueButton>Verify</BlueButton>
              </ButtonWrapper>
              <BarArrowWrapper onClick={showSeekerHandler}>
                <BarArrowRight
                  style={
                    showSeeker ? { transform: "rotate(45deg)" } : { transform: "rotate(-45deg)" }
                  }
                />
              </BarArrowWrapper>
            </CertificateBar>
            {showSeeker ? (
              <>
                <SeekerInfo>
                  <SeekerInfoHeader>
                    <CompanyName>{userObj.name}</CompanyName>
                  </SeekerInfoHeader>
                  <SeekerInfoBodyWrapper>
                    <SeekerInfoBody>
                      <SeekerInfoBodyLine>Phone: {userObj.phone}</SeekerInfoBodyLine>
                      <SeekerInfoBodyLine>Address: {userObj.street}</SeekerInfoBodyLine>
                      <SeekerInfoBodyLine>Zip Code: {userObj.zip_code}</SeekerInfoBodyLine>
                    </SeekerInfoBody>
                    <SeekerInfoBody>
                      <SeekerInfoBodyLine>Address: {userObj.street}</SeekerInfoBodyLine>
                      <SeekerInfoBodyLine>E-mail: {userObj.email}</SeekerInfoBodyLine>
                    </SeekerInfoBody>
                  </SeekerInfoBodyWrapper>
                </SeekerInfo>
              </>
            ) : null}
          </CertificateContainer>
        </DashboardContentContainer>
      </PageWrapper>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    userProfileReducer: state.userProfileReducer,
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(AdminPage);
