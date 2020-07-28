import React from "react";
import {BigTitle} from "../../../style/GlobalTitles";
import profilePic from "../../../assets/images/default-profile-pic.jpg";
import success from "../../../assets/icons/success_request.svg";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {DarkBlueButton, WhiteButton} from "../../../style/GlobalButtons";
import ButtonSpinner from "../../ButtonSpinner";
import Flip from 'react-reveal/Flip';
import Tada from 'react-reveal/Tada';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Rotate from 'react-reveal/Rotate';
import O_negative from "../../../assets/icons/O_negative.svg";
import O_positive from "../../../assets/icons/O_positive.svg";
import A_negative from "../../../assets/icons/A_negative.svg";
import A_positive from "../../../assets/icons/A_positive.svg";
import B_negative from "../../../assets/icons/B_negative.svg";
import B_positive from "../../../assets/icons/B_positive.svg";
import AB_negative from "../../../assets/icons/AB_negative.svg";
import AB_positive from "../../../assets/icons/AB_positive.svg";

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
  border: none;
  outline: none;
  img {
    width: ${rem("120px")};
    height: ${rem("120px")};
    background: transparent;
    border: none;
    outline: none;
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

// const NameContainer = styled.div`
//   width: ${rem("544px")};
//   height: ${rem("24px")};
//   font-style: normal;
//   font-weight: 600;
//   font-size: 14px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   letter-spacing: 0.75px;
//   text-transform: uppercase;
//   color: #121232;
//   margin-top: ${rem("14px")};
// `;
//
// const CityContainer = styled.div`
//   width: ${rem("544px")};
//   height: ${rem("16px")};
//   font-style: normal;
//   font-weight: normal;
//   font-size: 12px;
//   line-height: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #121232;
// `;

const BottomContainer = styled.div`
  width: ${rem("544px")};
  height: ${rem("260px")};
  display: flex;
  justify-content: center;
  margin-top: ${rem("20px")};
`;

const DetailTitlesContainer = styled.div`
  height: ${rem("250px")};
  width: ${rem("100px")};
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
  height: ${rem("250px")};
  width: ${rem("100px")};
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
    display: flex;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled(WhiteButton)`
  width: ${rem("194px")};
  display: flex;
  justify-content: center;
  align-items: center;
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


const ActiveProfileCard = ({activeRequest, activeProfile, handleSelectApplicant, showSpinner}) => {

    const renderBloodType = () => {
    if (activeProfile.blood_group === "O-") return O_negative;
    if (activeProfile.blood_group === "O+") return O_positive;
    if (activeProfile.blood_group === "A-") return A_negative;
    if (activeProfile.blood_group === "A+") return A_positive;
    if (activeProfile.blood_group === "B-") return B_negative;
    if (activeProfile.blood_group === "B+") return B_positive;
    if (activeProfile.blood_group === "AB-") return AB_negative;
    if (activeProfile.blood_group === "AB+") return AB_positive;
  };


    return (
        <Fade>
        <ProfileWrapper>
                        <UpperContainer>
                            <BigTitle>donor profile</BigTitle>
                            {activeRequest.status === "OP" ? (
                                <ProfilePicPlaceholder>
                                    <img src={renderBloodType()} alt={"avatar"}/>
                                </ProfilePicPlaceholder>
                            ) : activeProfile ? activeRequest.status === "CL" && activeProfile.id === activeRequest.selected_donor.id ? (
                                <SelectedTitle>Selected</SelectedTitle>
                            ) : activeRequest.status === "COM" ? (
                                <ProfilePicPlaceholder>
                                    <img src={success} alt="success sign"/>
                                </ProfilePicPlaceholder>
                            ) : (
                                <p>Sorry, we are confused a little bit.</p>
                            ) : null}
                        </UpperContainer>
                        <BottomContainer>
                            <DetailTitlesContainer>
                                <DetailTitle>ID:</DetailTitle>
                                <DetailTitle>Blood Type:</DetailTitle>
                                <DetailTitle>Gender:</DetailTitle>
                                <DetailTitle>Age:</DetailTitle>
                            </DetailTitlesContainer>
                            <DetailsContainer>
                                <Details>{activeProfile ? activeProfile.unique_donor_id : null}</Details>
                                <Details>{activeProfile ? activeProfile.blood_group : null}</Details>
                                <Details>{activeProfile ? activeProfile.gender === "M" ? "Male" : activeProfile.gender === "F" ? "Female" : "Other" : null}</Details>
                                <Details>{activeProfile ? activeProfile.age : null}</Details>
                            </DetailsContainer>
                        </BottomContainer>
                        <ButtonContainer>
                            {activeRequest.status === "OP" ? (
                                <SelectButton onClick={handleSelectApplicant}> {/*needs an onclick*/}
                                    {/*<ButtonSpinner/>*/}
                                    {showSpinner ? <ButtonSpinner/> : "+ Select Donor"}
                                </SelectButton>
                            ) : activeProfile ? activeRequest.selected_donor.id === activeProfile.id && activeRequest.status !== "COM" ? (
                                <CancelButton onClick={handleSelectApplicant}>
                                    {showSpinner ? <ButtonSpinner/> : "X Cancel Select"}
                                </CancelButton>
                            ) : activeRequest.status === "COM" ? null : null : null
                            }
                        </ButtonContainer>
                    </ProfileWrapper>
        </Fade>
    )
}

export default ActiveProfileCard