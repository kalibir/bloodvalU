import React from "react";
import {BigTitle} from "../../../style/GlobalTitles";
import profilePic from "../../../assets/images/default-profile-pic.jpg";
import success from "../../../assets/icons/success.png";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {DarkBlueButton, WhiteButton} from "../../../style/GlobalButtons";

const ProfileWrapper = styled.div`
  width: ${rem("544px")};
  height: ${rem("628px")};
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #fafafc;
`;

const UpperContainer = styled.div`
  width: ${rem("544px")};
  height: ${rem("285px")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfilePicPlaceholder = styled.div`
  width: ${rem("120px")};
  height: ${rem("120px")};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  margin-top: ${rem("15px")};
  img {
    width: ${rem("120px")};
    height: ${rem("120px")};
  }
`;

const SelectedTitle = styled.h1`
  width: ${rem("211px")};
  height: ${rem("64px")};
  font-style: normal;
  font-weight: 800;
  font-size: 44px;
  line-height: 64px;
  color: #43a047;
  text-transform: uppercase;
  margin-top: ${rem("42px")};
  margin-bottom: ${rem("30px")};
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
  margin-top: ${rem("14px")};
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
  height: ${rem("260px")};
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
  margin-bottom: ${rem("16px")};
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
  margin-bottom: ${rem("16px")};
`;

const AddressTitle = styled(DetailTitle)`
  margin-bottom: ${rem("64px")};
`;

const ButtonContainer = styled.div`
  width: ${rem("544px")};
  height: ${rem("48px")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${rem("24px")};
`;

const SelectButton = styled(DarkBlueButton)`
  width: ${rem("194px")};
`;

const CancelButton = styled(WhiteButton)`
  width: ${rem("194px")};
`;

const PlusSignButton = styled.span`
  color: #ffffff;
  width: ${rem("9.3px")};
  height: ${rem("9.3px")};
  margin-right: ${rem("10px")};
`;

const MinusSignButton = styled(PlusSignButton)`
  color: #121232;
`;


const ActiveProfileCard = ({activeRequest, activeProfile, handleSelectApplicant}) => {

    return (
        <ProfileWrapper>
                        <UpperContainer>
                            <BigTitle>donor profile</BigTitle>
                            {activeRequest.status === "OP" ? (
                                <ProfilePicPlaceholder>
                                    <img src={activeProfile ? activeProfile.avatar : profilePic} alt={"avatar"}/>
                                </ProfilePicPlaceholder>
                            ) : activeProfile ? activeRequest.status === "CL" && activeProfile.id === activeRequest.selected_donor.id ? (
                                <SelectedTitle>Selected</SelectedTitle>
                            ) : activeRequest.status === "COM" ? (
                                <ProfilePicPlaceholder>
                                    <img src={success} alt={"should be antonios pic"}/>
                                </ProfilePicPlaceholder>
                            ) : (
                                <p>Sorry, we are confused a little bit.</p>
                            ) : null}
                            <NameContainer>{activeProfile ? activeProfile.first_name + " " + activeProfile.last_name : null}</NameContainer>
                            <CityContainer>{activeProfile ? `${activeProfile.street} ${activeProfile.zip_code}, ${activeProfile.country}` : null}</CityContainer>
                        </UpperContainer>
                        <BottomContainer>
                            <DetailTitlesContainer>
                                <DetailTitle>Gender:</DetailTitle>
                                <DetailTitle>Birthday:</DetailTitle>
                                <AddressTitle>Address:</AddressTitle>
                                <DetailTitle>Phone:</DetailTitle>
                                <DetailTitle>Email:</DetailTitle>
                            </DetailTitlesContainer>
                            <DetailsContainer>
                                <Details>{activeProfile ? activeProfile.gender : null}</Details>
                                <Details>{activeProfile ? activeProfile.birthday : null}</Details>
                                <Details>
                                    {activeProfile ? activeProfile.zip_code : null}<br/> {activeProfile ? activeProfile.city : null}
                                    <br/> {activeProfile ? activeProfile.country : null}
                                </Details>
                                <Details>{activeProfile ? activeProfile.phone : null}</Details>
                                <Details>{activeProfile ? activeProfile.email : null}</Details>
                            </DetailsContainer>
                        </BottomContainer>
                        <ButtonContainer>
                            {activeRequest.status === "OP" ? (
                                <SelectButton onClick={handleSelectApplicant}> {/*needs a onclick*/}
                                    <PlusSignButton/>+ Select Donor
                                </SelectButton>
                            ) : activeProfile ? activeRequest.selected_donor.id === activeProfile.id && activeRequest.status !== "COM" ? (
                                <CancelButton onClick={handleSelectApplicant}>
                                    <MinusSignButton/>X Cancel Select
                                </CancelButton>
                            ) : activeRequest.status === "COM" ? null : null : null}
                        </ButtonContainer>
                    </ProfileWrapper>
    )
}

export default ActiveProfileCard