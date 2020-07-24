import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import rem from "polished/lib/helpers/rem";
import NumberFormat from "react-number-format";
import { PageContainer } from "../../style/GlobalWrappers";
import { BigInput } from "../../style/GlobalInputs";
import { DarkBlueButton } from "../../style/GlobalButtons";
import { BaseStatusButton } from "../../style/GlobalButtons/";
import { connect } from "react-redux";
import { getAllSeekersAction } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { applyToRequestActionInAll } from "../../store/actions/bloodRequestActions";
import { searchAllRequestsAndTestsAction } from "../../store/actions/searchActions";
import { getLoggedInUserAction } from "../../store/actions/userActions";
import { bloodGroupTest } from "../../HelperFunctions";
import SeekerCertificateBar from "./CertificateBar";
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
  width: 60%;
  height: ${rem("40px")};
`;

const SearchButton = styled(DarkBlueButton)`
  width: ${rem("96px")};
  height: ${rem("40px")};
`;

const FilterContainer = styled.div`
  width: 256px;
  display: flex;
  justify-content: space-around;
`;

const FilterLabel = styled.label`
  font-size: 16px;
  color: #121232;
`;

const FilterInput = styled.select`
  background: #ffffff;
  border: 1px solid #a1a4b1;
  box-sizing: border-box;
  border-radius: 4px;
  width: ${rem("160px")};
  height: ${rem("24px")};
  outline: none;
  padding-left: ${rem("16px")};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #232735;

  &:focus {
    outline: none;
  }
`;

const CertificateContainer = styled.div`
  width: 100%;
  background-color: ${ColorDebug ? "lightslategrey" : ""};
`;

const AdminPage = ({ dispatch, profilesReducer: { profiles } }) => {
  const [showSeeker, setSeekerInfo] = useState(false);
  const [active, setActive] = useState("requests");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    dispatch(getAllSeekersAction());
  }, [dispatch]);

  const [searchParams, setSearchParams] = useState("");

  const handleSeekers = (e) => {
    console.log("in the apply handler");
    dispatch(getAllSeekersAction());
  };

  const handleSearch = (event) => {
    dispatch(getAllSeekersAction(searchParams, active));
    setSearchParams("");
  };

  const handleSearchInput = (e) => {
    const value = e.currentTarget.value;
    setSearchParams(value);
  };

  const handleVerifyCertificate = (e) => {
    setVerified(!verified);
  };
  return (
    <PageContainer>
      <PageWrapper>
        <DashboardContentContainer>
          <AdminText>Admin Panel</AdminText>
          <SearchContainer>
            <SearchInput onChange={handleSearchInput} placeholder="Search..." />
            <SearchButton onClick={handleSearch}>Search</SearchButton>
            <FilterContainer>
              <FilterLabel>Sort by:</FilterLabel>
              <FilterInput>
                <option value="date">Date</option>
                <option value="valid">Valid</option>
                <option value="not_valid">Not Valid</option>
              </FilterInput>
            </FilterContainer>
          </SearchContainer>

          <CertificateContainer>
            {profiles
              ? profiles.map((profile, index) => {
                  return <SeekerCertificateBar key={index} profile={profile} />;
                })
              : null}
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
    profilesReducer: state.profilesReducer,
  };
};

export default connect(mapStateToProps)(AdminPage);
