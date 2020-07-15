import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import profilePic from "../../assets/images/default-profile-pic.jpg"
import {BigTitle} from "../../style/GlobalTitles";
import {DarkBlueButton, WhiteButton} from "../../style/GlobalButtons";

const ProfileWrapper = styled.div`
    width: ${rem("544px")};
    height: ${rem("628px")};
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #FAFAFC;
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
    color: #43A047;
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
    color: #4E4E5A;
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
    color: #FFFFFF;
    width: ${rem("9.3px")};
    height: ${rem("9.3px")};
    margin-right: ${rem("10px")};
`;

const MinusSignButton = styled(PlusSignButton)`
    color: #121232;
`

const DonorProfileSelected = (props) => {
    let selected_donor = false

  return (
      <ProfileWrapper>
            <UpperContainer>
                <BigTitle>donor profile</BigTitle>
                    {selected_donor
                    ? <SelectedTitle>Selected</SelectedTitle>
                    : <ProfilePicPlaceholder>
                        <img src={profilePic} alt={"avatar"}/>
                      </ProfilePicPlaceholder>}
                <NameContainer>
                    Name Name Name
                </NameContainer>
                <CityContainer>
                    City, Country
                </CityContainer>
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
                    <Details>Female</Details>
                    <Details>25.07.1999</Details>
                    <Details>Technoparkstrasse 1<br/> 8999 Zürich<br/> Schweiz</Details>
                    <Details>0781111111</Details>
                    <Details>example@email.com</Details>
                </DetailsContainer>
            </BottomContainer>
            <ButtonContainer>
                {selected_donor
                ? <CancelButton><MinusSignButton></MinusSignButton>X Cancel Select</CancelButton>
              : <SelectButton><PlusSignButton></PlusSignButton>+ Select Donor</SelectButton>
                    }
            </ButtonContainer>
      </ProfileWrapper>
  )
}

export default DonorProfileSelected;