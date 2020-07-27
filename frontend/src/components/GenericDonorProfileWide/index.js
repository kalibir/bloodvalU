import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import profilePic from "../../assets/images/default-profile-pic.jpg"
import {DarkBlueButton} from "../../style/GlobalButtons";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const ProfileWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
`;

const UpperContainer = styled.div`
    height: ${rem("300px")};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ProfilePicPlaceholder = styled.div`
    height: ${rem("160px")};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    img {
        width: ${rem("160px")};
        height: ${rem("160px")};
  }
`;

const NameContainer = styled.div`
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
    height: ${rem("315px")};
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    height: ${rem("50px")};
    width: ${rem("315px")};
    display: flex;
    justify-content: center;
    align-items: center;
`

const DetailTitlesContainer = styled.div`
    height: ${rem("328px")};
`;
const DetailTitle = styled.p`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #000000;
    margin-bottom: ${rem("16px")};
    width: ${rem("72px")};
`;

const DetailsContainer = styled.div`
    height: ${rem("328px")};
    width: ${rem("204px")};
    margin-left: ${rem("64px")};
`;

const Test = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Details = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #4E4E5A;
    margin-bottom: ${rem("16px")};
`;

const AddressTitle = styled(DetailTitle)`
    margin-bottom: ${rem("8px")};
`;

const AddressDetails = styled(Details)`
    margin-bottom: ${rem("8px")};
`;

const EditButton = styled(DarkBlueButton)`
    margin-bottom: ${rem("16px")};
`;



const DonorProfileCardWide = ({
                                  userObj: {
                                      id,
                                      phone,
                                      is_donor,
                                      email,
                                      first_name,
                                      last_name,
                                      country,
                                      zip_code,
                                      street,
                                      avatar,
                                      birthday,
                                      total_points,
                                      blood_group,
                                      gender,
                                  }
                              }) => {

    return (
        <Fade>
        <ProfileWrapper>
            <UpperContainer name={"upper"}>
                <ProfilePicPlaceholder>
                    <img src={avatar ? avatar : profilePic} alt={"avatar"}/>
                </ProfilePicPlaceholder>
                <NameContainer>
                    {`${first_name} ${last_name}`}
                </NameContainer>
                <CityContainer>
                    {zip_code}, {country}
                </CityContainer>
            </UpperContainer>
            <BottomContainer>
                <DetailTitlesContainer>
                    <Test>
                        <DetailTitle>Gender: </DetailTitle>
                        <Details>{gender==="M" ? "Male" : gender==="F" ? "Female" : "Other"}</Details>
                    </Test>
                    <Test>
                        <DetailTitle>Birthday: </DetailTitle>
                        <Details>{birthday}</Details>
                    </Test>
                    <Test>
                        <AddressTitle>Address:</AddressTitle>
                        <AddressDetails>{street}</AddressDetails>
                    </Test>
                    <Test>
                        <AddressTitle></AddressTitle>
                        <AddressDetails>{zip_code}</AddressDetails>
                    </Test>
                    <Test>
                        <DetailTitle></DetailTitle>
                        <Details>{country}</Details>
                    </Test>
                    <Test>
                        <DetailTitle>Phone:</DetailTitle>
                        <Details>{phone.length ? phone : "please add a number"}</Details>
                    </Test>
                    <Test>
                        <DetailTitle>Email:</DetailTitle>
                        <Details>{email}</Details>
                    </Test>
                </DetailTitlesContainer>

            </BottomContainer>
            <Link to={`/editdonor`}>
                <EditButton>Edit Profile</EditButton>
            </Link>
        </ProfileWrapper>
            </Fade>
    )
}

export default DonorProfileCardWide;