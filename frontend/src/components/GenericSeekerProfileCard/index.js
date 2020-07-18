import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import profilePic from "../../assets/images/default-profile-pic.jpg";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUserAction } from "../../store/actions/userActions";

const ProfileWrapper = styled.div`
  width: ${rem("544px")};
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const UpperContainer = styled.div`
  width: ${rem("544px")};
  height: ${rem("300px")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfilePicPlaceholder = styled.div`
  width: ${rem("160px")};
  height: ${rem("160px")};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  img {
    width: ${rem("160px")};
    height: ${rem("160px")};
  }
`;

const NameContainer = styled.div`
  width: ${rem("544px")};
  height: ${rem("24px")};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.75px;
  text-transform: uppercase;
  color: #121232;
  margin-top: ${rem("16px")};
`;

const CityContainer = styled.div`
  width: ${rem("544px")};
  height: ${rem("16px")};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #121232;
`;

const BottomContainer = styled.div`
  width: ${rem("544px")};
  height: ${rem("328px")};
  display: flex;
`;

const DetailTitlesContainer = styled.div`
  height: ${rem("328px")};
  width: ${rem("25px")};
  margin-left: ${rem("158px")};
`;

const DetailTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #000000;
  margin-bottom: ${rem("40px")};
`;

const DetailsContainer = styled.div`
  height: ${rem("328px")};
  width: ${rem("204px")};
  margin-left: ${rem("64px")};
`;

const Details = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #4e4e5a;
  margin-bottom: ${rem("40px")};
`;

const AddressTitle = styled(DetailTitle)`
  margin-bottom: ${rem("88px")};
`;

const SeekerProfileCard = ({ authReducer: { userObj }, dispatch }) => {
  useEffect(() => {
    dispatch(getLoggedInUserAction());
  }, [dispatch]);
  return (
    <>
      {userObj ? (
        <ProfileWrapper>
          <UpperContainer>
            <ProfilePicPlaceholder>
              <img src={userObj.logo} alt={"logo"} />
            </ProfilePicPlaceholder>
            <NameContainer>{userObj.name}</NameContainer>
            <CityContainer> {userObj.country}</CityContainer>
          </UpperContainer>
          <BottomContainer>
            <DetailTitlesContainer>
              <AddressTitle>Address:</AddressTitle>
              <DetailTitle>Website:</DetailTitle>
              <DetailTitle>Phone:</DetailTitle>
              <DetailTitle>Email:</DetailTitle>
            </DetailTitlesContainer>
            <DetailsContainer>
              <Details>
                {userObj.street}
                <br />
                <br /> {userObj.country}
              </Details>
              <Details>{userObj.website}</Details>
              <Details>{userObj.phone}</Details>
              <Details>{userObj.email}</Details>
            </DetailsContainer>
          </BottomContainer>
        </ProfileWrapper>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(SeekerProfileCard);
