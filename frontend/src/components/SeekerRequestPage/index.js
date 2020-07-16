import React, {useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {PageContainer} from "../../style/GlobalWrappers";
import GenericSeekerRequestBar, {DonorSubBar} from "../GenericSeekerRequestBar";
import profilePic from "../../assets/images/default-profile-pic.jpg"
import success from "../../assets/icons/success.png"
import {BigTitle} from "../../style/GlobalTitles";
import {DarkBlueButton, WhiteButton} from "../../style/GlobalButtons";

const PageWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const LeftSide = styled.div`
    height: 100%;
    width: calc(100% - 700px);
    //width: 40%;
    min-width: 576px;
    padding-top: ${rem("36px")};
    padding-left: ${rem("160px")};
`;

const RightSide = styled.div`
    width: ${rem("700px")};
    //height: ${rem("628px")};
    height: 100%;
`;

const MenuContainer = styled.div`
    //width: ${rem("445px")};
    width: 100%;
    height: ${rem("48px")};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: ${rem("32px")};
`;

const MiddleButton = styled.button`
    height: 100%;
    width: 34%;
    background-color: #FFFFFF;
    font-weight: 500;
    font-size: ${rem("14px")};
    color: ${(props) => (props.active ? "#121213" : "#A1A4B1")};;
    border: none;
    border-top: 2px solid #FFFFFF;
    border-bottom: ${(props) => (props.active ? "2px solid #121213" : "2px solid #FFFFFF")};
    text-transform: capitalize;
    
    :hover {
        color: #121213;        
    }
`;

const SideButton = styled(MiddleButton)`
    width: 33%;
`;

const DashboardContentContainer = styled.div`
    //width: ${rem("445px")};
    width: 80%;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    overflow: auto;
    max-height: ${rem("620px")};
`;

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
`;


const SeekerDashboard = () => {
    // const [active, setActive] = useState("All_requests");
    const [active, setActive] = useState("Open");

    const handleClick = (e) => {
        const value = e.target.id;
        setActive(value);
    };

    const [status, setStatus] = useState("OP");

    const handleSelectButton = (e) => {
        setStatus("CL")
    }

    const handleComplete = (e) => {
        setStatus("COM")
    }

    const handleUnSelectButton = (e) => {
        setStatus("OP")
    }

    return (
        <PageContainer>
            <PageWrapper>
                <LeftSide>
                    <DashboardContentContainer>
                        <MenuContainer>
                            <SideButton
                                id="Open"
                                onClick={handleClick}
                                active={active === "Open"}>
                                Open
                            </SideButton>
                            <MiddleButton
                                id="Complete"
                                onClick={handleClick}
                                active={active === "Complete"}>
                                Complete
                            </MiddleButton>
                            <SideButton
                                id="Closed"
                                onClick={handleClick}
                                active={active === "Closed"}>
                                Closed
                            </SideButton>
                        </MenuContainer>
                        <GenericSeekerRequestBar status={status} func={handleComplete}/>
                        {/*<GenericSeekerRequestBar/>*/}
                        {/*<GenericSeekerRequestBar/>*/}
                        {/*<GenericSeekerRequestBar/>*/}
                        {/*<GenericSeekerRequestBar/>*/}
                    </DashboardContentContainer>
                </LeftSide>
                <RightSide>
                    <ProfileWrapper>
            <UpperContainer>
                <BigTitle>donor profile</BigTitle>
                    {status === "OP"
                    ? <ProfilePicPlaceholder>
                        <img src={profilePic} alt={"avatar"}/>
                      </ProfilePicPlaceholder>
                    : status === "CL"
                            ? <SelectedTitle>Selected</SelectedTitle>
                    : status === "COM"
                                ? <ProfilePicPlaceholder>
                        <img src={success} alt={"should be antonios pic"}/>
                      </ProfilePicPlaceholder>
                    : <p>Sorry, we are confused a little bit.</p>}
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
                {status === "OP"
                    ? <SelectButton onClick={handleSelectButton}><PlusSignButton></PlusSignButton>+ Select Donor</SelectButton>
                    : status === "CL"
                            ? <CancelButton onClick={handleUnSelectButton}><MinusSignButton></MinusSignButton>X Cancel Select</CancelButton>
                    : status === "COM"
                                ? null
                    : null}
            </ButtonContainer>
      </ProfileWrapper>
                </RightSide>
            </PageWrapper>
        </PageContainer>
    );
};

export default SeekerDashboard;