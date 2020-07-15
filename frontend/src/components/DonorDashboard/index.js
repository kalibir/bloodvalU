import React, {useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {PageContainer} from "../../style/GlobalWrappers";
import {BigInput} from "../../style/GlobalInputs";
import {DarkBlueButton} from "../../style/GlobalButtons";
import {SmallTitle} from "../../style/GlobalTitles";

const ColorDebug = false;  //at true all element get colored background for checking

const PageWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${ColorDebug ? "darkorange" : ""};
`

const LeftSide = styled.div`
    height: 100%;
    width: calc(100% - 544px);
    //width: 40%;
    min-width: 576px;
    padding-top: ${rem("36px")};
    padding-left: ${rem("160px")};
    background-color: ${ColorDebug ? "burlywood" : ""};
`

const RightSide = styled.div`
    width: ${rem("544px")};
    //height: ${rem("628px")};
    height: 100%;
    background-color: ${ColorDebug ? "cornflowerblue" : ""};
`

const MenuContainer = styled.div`
    //width: ${rem("445px")};
    width: 100%;
    height: ${rem("48px")};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: ${rem("24px")};
    background-color: ${ColorDebug ? "darkkhaki" : ""};
`

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
`

const SideButton = styled(MiddleButton)`
    width: 33%;
`

const DashboardContentContainer = styled.div`
    //width: ${rem("445px")};
    width: 70%;
   
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    background-color: ${ColorDebug ? "deepskyblue" : ""};
`

const SearchContainer = styled.div`
    //width: ${rem("445px")};
    width: 100%;
    height: ${rem("40px")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${rem("32px")};
    background-color: ${ColorDebug ? "darksalmon" : ""};
`

const SearchInput = styled(BigInput)`
    //width: ${rem("326px")};
    width: 80%;
    height: ${rem("40px")};
`

const SearchButton = styled(DarkBlueButton)`
    width: ${rem("96px")};
    height: ${rem("40px")};
`

const PointsHeader = styled.div`
    //width: ${rem("445px")};
    width: 100%;
    height: ${rem("48px")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    //margin-bottom: ${rem("16px")};
    //min-width should be 432px because of the texts
    background-color: ${ColorDebug ? "lightgreen" : ""};
`
const PointsText = styled.div`
    font-size: ${rem("24px")};
    font-weight: 600;
    color: #43A047;
    margin-right: ${rem("24px")};
`
const OfferTitle = styled(SmallTitle)`
    font-size: ${rem("24px")};
    font-weight: 600;
    margin-left: ${rem("8px")};
    letter-spacing: 1.5px;
`

const UnderLine = styled.div`
    width: 100%;
    height: 2px;
    background-color: #A1A4B1;
    border: 1px solid #A1A4B1;
    margin-bottom: ${rem("16px")};
`

let points = 1000;

export const DonorDashboard = () => {

    // const [active, setActive] = useState("All_requests");
    const [active, setActive] = useState("Points");

    const handleClick = (e) => {
        const value = e.target.id;
        setActive(value);
    };

    return (
        <PageContainer>
            <PageWrapper>
                <LeftSide>
                    <DashboardContentContainer>
                        <MenuContainer>
                            <SideButton
                                id="All_requests"
                                onClick={handleClick}
                                active={active === "All_requests"}>
                                All requests
                            </SideButton>
                            <MiddleButton
                                id="Applied"
                                onClick={handleClick}
                                active={active === "Applied"}>
                                Applied
                            </MiddleButton>
                            <SideButton
                                id="Points"
                                onClick={handleClick}
                                active={active === "Points"}>
                                Points menu
                            </SideButton>
                        </MenuContainer>

                        <SearchContainer>
                            <SearchInput placeholder="Search..." />
                            <SearchButton>Search</SearchButton>
                        </SearchContainer>

                        {active === "Points" ?
                            <>
                            <PointsHeader>
                                <OfferTitle>Offers</OfferTitle>
                                <PointsText>Your total points: {points} pts</PointsText>
                            </PointsHeader>
                            <UnderLine />
                            <div>Offers should be here :)</div></>
                            : <div>Requests should be here</div>}

                    </DashboardContentContainer>
                </LeftSide>
                <RightSide>
                    <div>Hello Right Dashboard :)</div>
                </RightSide>
            </PageWrapper>
        </PageContainer>
    )
}