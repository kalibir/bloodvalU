import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import profilePic from "../../assets/images/default-profile-pic.jpg";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUserAction } from "../../store/actions/userActions";
import { DarkBlueButton } from "../../style/GlobalButtons";
import { useHistory } from "react-router";

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
    background: none;
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
  width: 100%;
  margin-left: ${rem("158px")};
`;

const DetailTitle = styled.div`
  display: flex;
  width: fit-content;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #000000;
  margin-bottom: ${rem("40px")};
  
  a{
    color: #121232;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
  }
`;

const EditProfileBtn = styled(DarkBlueButton)`
  align-self: center;
`;

const SeekerProfileCard = ({ authReducer: { userObj }, dispatch }) => {
  const { push } = useHistory();
  useEffect(() => {
    dispatch(getLoggedInUserAction());
  }, [dispatch]);

  const onClickHandler = (event) => {
    push("/editseeker");
  };

  return (
    <>
      {userObj ? (
        <ProfileWrapper>
          <UpperContainer>
            <ProfilePicPlaceholder>
              <img src={userObj.logo ? userObj.logo : profilePic} alt={"logo"} />
            </ProfilePicPlaceholder>
            <NameContainer>{userObj.name}</NameContainer>
            <CityContainer> {userObj.country}</CityContainer>
          </UpperContainer>
          <BottomContainer>
            <DetailTitlesContainer>
              <DetailTitle>
                Address: {userObj.street}, {userObj.country}
              </DetailTitle>
              <DetailTitle>Website: <a href={userObj.website}> {userObj.website}</a></DetailTitle>
              <DetailTitle>Phone: {userObj.phone}</DetailTitle>
              <DetailTitle>Email: {userObj.email}</DetailTitle>
            </DetailTitlesContainer>
          </BottomContainer>
          <EditProfileBtn onClick={onClickHandler}>Edit Profile</EditProfileBtn>
        </ProfileWrapper>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(SeekerProfileCard);
