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
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${ColorDebug ? "darkorange" : ""};
`;

const DashboardContentContainer = styled.div`
    //width: ${rem("445px")};
    width: 70%;   
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    background-color: ${ColorDebug ? "deepskyblue" : ""};
`;

const AdminText = styled.p`
  position: relative;
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
  width: ${rem("480px")};
  overflow: auto;
`;
const BarWrapper = styled.div`
  //width: 445px;
  width: 100%;
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
  grid-template-areas: "text status urgent blood button valid arrow";
  grid-template-columns: 2fr 1fr 1fr 35px 1fr 1fr 1fr;
  background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;
  align-items: center;
  grid-gap: 8px;
  cursor: pointer;
`;

const GreenButton = styled(BaseStatusButton)`
  background-color: #43a047;
`;

const RedButton = styled(BaseStatusButton)`
  background-color: #d33449;
`;

const TextWrapper = styled.div`
  display: flex;
  height: 35px;
  grid-area: text;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  grid-area: button;
`;

const IconWrapper = styled(ButtonWrapper)`
  grid-area: status;
  height: 100%;
  display: flex;
  align-items: center;
`;

const UrgentWrapper = styled(ButtonWrapper)`
  grid-area: urgent;
  height: 100%;
  display: flex;
  align-items: center;
`;

const BloodDiv = styled(TextWrapper)`
  grid-area: blood;
  height: 35px;
  background-color: darkred;
  border-radius: 50%;
  padding: 2px;
`;

const Type = styled.img`
  color: white;
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
const AdminPage = ({ dispatch, authReducer: { userObj } }) => {
  const [showSeeker, setSeekerInfo] = useState(false);
  const [active, setActive] = useState("requests");

  const showSeekerHandler = (event) => {
    setSeekerInfo(!showSeeker);
  };
  const [searchParams, setSearchParams] = useState("");
  const handleApply = (e) => {
    console.log("in the apply handler");
    dispatch(getAllSeekersAction(userObj.certificate));
  };

  const handleSearch = (event) => {
    dispatch(searchAllRequestsAndTestsAction(searchParams, active));
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
            <TextWrapper onClick={showSeekerHandler}> Request </TextWrapper>
            <BarArrowWrapper onClick={showSeekerHandler}>
              <BarArrowRight
                style={
                  showSeeker ? { transform: "rotate(45deg)" } : { transform: "rotate(-45deg)" }
                }
              />
            </BarArrowWrapper>
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
