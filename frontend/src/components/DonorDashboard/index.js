import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import rem from "polished/lib/helpers/rem";
import NumberFormat from "react-number-format";
import {PageContainer} from "../../style/GlobalWrappers";
import {BigInput} from "../../style/GlobalInputs";
import {DarkBlueButton} from "../../style/GlobalButtons";
import {SmallTitle} from "../../style/GlobalTitles";
import GenericDonorTestCard from "../GenericDonorTestCard";
import GenericDonorRequestBar from "../GenericDonorRequestBar";
import {connect} from "react-redux";
import DonorProfileCardWide from "../GenericDonorProfileWide";
import {getAllRequestsAction} from "../../store/actions/bloodRequestActions";
import {searchAllRequestsAndTestsAction} from "../../store/actions/searchActions";
import {getLoggedInUserAction} from "../../store/actions/userActions";
import {bloodGroupTest} from "../../HelperFunctions";
import Spinner from "../../components/GenericSpinner";
import {device, size} from "../../style/Functions";
import Fade from "react-reveal/Fade";
import SeekerCertificateBar from "../AdminPage/CertificateBar";

const ColorDebug = false; //at true all element get colored background for checking

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
      @media ${device.laptop} { 
      flex-direction: column;
      overflow: auto;
      
      > div {
        width: 100%;
        flex: 1 1 auto;
      }
      
  }
  background-color: ${ColorDebug ? "darkorange" : ""};
`;

const LeftSide = styled.div`
  width: 50%;
  display: flex;
  padding: ${rem("40px")};  
  justify-content: center;
  background-color: ${ColorDebug ? "burlywood" : ""};
`;

const RightSide = styled.div`
    padding: ${rem("40px")};  
    width: 50%;
    background-color: ${ColorDebug ? "cornflowerblue" : ""};
`;

const MenuContainer = styled.div`
    width: 100%;
    height: ${rem("48px")};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: ${rem("24px")};
    background-color: ${ColorDebug ? "darkkhaki" : ""};
`;

export const MiddleButton = styled.button`
  height: 100%;
  position: relative;
  width: 34%;
  background-color: #ffffff;
  font-weight: 500;
  font-size: ${rem("14px")};
  color: ${(props) => (props.active ? "#121213" : "#A1A4B1")};
  border: none;
  border-top: 2px solid #ffffff;
  text-transform: capitalize;

  :hover {
    color: #121213;
  }

  ::after {
    position: absolute;
    bottom: 0;
    content: "";
    display: block;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    background: #121213;
    transition: width 0.3s;
  }

  :focus::after {
    color: #121213;
    width: 100%;
    transition: width 0.3s;
  }
`;

const SideButton = styled(MiddleButton)`
  width: 33%;
`;

const DashboardContentContainer = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column;
    justify-content: flex-start;
    background-color: ${ColorDebug ? "deepskyblue" : ""};
`;

const SearchFormContainer = styled.form`
    width: 100%;
    height: ${rem("40px")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${rem("10px")};
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

const PointsHeader = styled.div`
    width: 100%;
    height: ${rem("48px")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    //min-width should be 432px because of the texts
    background-color: ${ColorDebug ? "lightgreen" : ""};
`;

const breatheAnimation = keyframes`
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, 3px);
    }
    100% {
      transform: translate(0, 0);
    }  
`

const CustomNumber = styled(NumberFormat)`
`

const Animated = styled.div`
  animation: ${breatheAnimation} 2s linear infinite;
`


const PointsText = styled.div`
  font-size: ${rem("24px")};
  font-weight: 600;
  text-shadow: 2px 0 0 #43a047, -2px 0 0 #43a047, 0 2px 0 #43a047, 0 -2px 0 #43a047, 1px 1px #43a047, -1px -1px 0 #43a047, 1px -1px 0 #43a047, -1px 1px 0 #43a047;
  color: white;
   
  margin-right: ${rem("8px")};
`;
const OfferTitle = styled(SmallTitle)`
  font-size: ${rem("24px")};
  font-weight: 600;
  margin-left: ${rem("8px")};
  letter-spacing: 1.5px;
`;

const UnderLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #a1a4b1;
  border: 1px solid #a1a4b1;
  margin-bottom: ${rem("16px")};
`;

const OfferContainer = styled.div`
  width: 100%;
  overflow: auto;
  max-height: 550px;
  height: inherit;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  
  justify-content: center;
  @media ${device.laptop} {
    height: auto;
  }
  background-color: ${ColorDebug ? "greenyellow" : ""};
`;

const RequestContainer = styled.div`
  width: 100%;
  background-color: ${ColorDebug ? "lightslategrey" : ""};
  overflow: auto;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  height: 100%;
  overflow: auto;
  ${(props) => (props.active ? "" : "display:none")}
`

const TestContent = styled.div`
  height: 100%;
  ${(props) => (props.active ? "" : "display:none")}
`

const RequestCountDown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffa2a2;
  color: orangered;
  font-weight: 500;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  margin-bottom: 38px;
`



const DonorDashboard = ({
                            dispatch,
                            userProfileReducer: {offeredTests, requests, appliedRequests},
                            authReducer: {userObj},
                        }) => {
        const [active, setActive] = useState("requests");
        const handleClick = (e) => {
            const value = e.target.id;
            if (value === "tests") dispatch(getLoggedInUserAction());
            setActive(value);
        };

        const [searchParams, setSearchParams] = useState("");

        const handleSearch = (event) => {
            // event.preventDefault()
            dispatch(searchAllRequestsAndTestsAction(searchParams, active));
            // setSearchParams("");
        };

        const handleSearchInput = (e) => {
            const value = e.currentTarget.value;
            setSearchParams(value);
        };

    useEffect(() => {
        // get Requests and tests
        dispatch(getAllRequestsAction()); // This gets all requests
        dispatch(searchAllRequestsAndTestsAction("", "tests")); //This gets all offered tests
        dispatch(getLoggedInUserAction());
    }, [dispatch]);
    let today = new Date()
    let next = new Date(userObj.next_donation)
    let diff = Math.floor(((((Math.abs(today - next))/1000)/60)/60)/24)
    const handleFilterTests = () => {
            return offeredTests.map((test, index) => {
                if (
                    test.seeker.name.toLowerCase().includes(searchParams) ||
                    test.seeker.zip_code.includes(searchParams) ||
                    test.seeker.street.toLowerCase().includes(searchParams) ||
                    test.seeker.country.toLowerCase().includes(searchParams) ||
                    test.test_type.toLowerCase().includes(searchParams)
                ) {
                    return <GenericDonorTestCard key={index} test={test}/>
                }
            })

        }

        const handleFilterRequests = () => {
            return requests.map((request, index) => {
                if (
                    request.seeker.name.toLowerCase().includes(searchParams) ||
                    request.blood_group.toLowerCase().includes(searchParams) ||
                    request.seeker.zip_code.includes(searchParams) ||
                    request.seeker.country.includes(searchParams) ||
                    request.seeker.street.toLowerCase().includes(searchParams) &&
                    (userObj && bloodGroupTest(userObj.blood_group, request))
                ) {
                    return (
                        <GenericDonorRequestBar key={index} request={request}/>
                    );
                }
            });
        }

        const handleFilterAppliedRequests = () => {
            return requests.map((request, index) => {
                if (
                    request.seeker.name.toLowerCase().includes(searchParams) ||
                    request.seeker.zip_code.includes(searchParams) ||
                    request.seeker.country.includes(searchParams) ||
                    request.blood_group.includes(searchParams) ||
                    request.seeker.street.toLowerCase().includes(searchParams) &&
                    (request.logged_in_donor_applied)
                ) {
                    return (
                        <GenericDonorRequestBar key={index} request={request}/>
                    );
                }
            });
        }

    return (
        <PageContainer>
            <PageWrapper>
                <LeftSide>
                    <DashboardContentContainer>
                        <MenuContainer>
                            <SideButton id="requests" onClick={handleClick} active={active === "requests"}>
                                All requests
                            </SideButton>
                            <MiddleButton id="applied" onClick={handleClick} active={active === "applied"}>
                                Applied
                            </MiddleButton>
                            <SideButton id="tests" onClick={handleClick} active={active === "tests"}>
                                Points menu
                            </SideButton>
                        </MenuContainer>

                            <SearchFormContainer onSubmit={handleSearch}>
                                <SearchInput onChange={handleSearchInput} value={searchParams}
                                             placeholder="Search..."/>{" "}
                                {/*TODO add search on enter*/}
                                <SearchButton>Refresh</SearchButton>
                            </SearchFormContainer>
                            <TestContent name={"content"} active={active === "tests"}>
                                <PointsHeader>
                                    <OfferTitle>Offers</OfferTitle>
                                    <Animated>
                                        <CustomNumber
                                            isNumericString={true}
                                            renderText={(value) => <PointsText>{value} pts</PointsText>}
                                            value={userObj ? userObj.total_points : 0}
                                            displayType={"text"}
                                            thousandSeparator={" "}
                                        />
                                    </Animated>
                                </PointsHeader>
                                <UnderLine/>
                                <OfferContainer>
                                    {offeredTests ? handleFilterTests() : null}
                                </OfferContainer>
                            </TestContent>
                            <Content name={"all"} active={active === "requests"}>

                            <RequestContainer>
                                {diff <= 0 ?
                                    requests ? (
                                    handleFilterRequests()
                                ) : (
                                    <SpinnerContainer>
                                        <Spinner/>
                                    </SpinnerContainer>
                                ) :
                                    <RequestCountDown>{diff} days until next donation.</RequestCountDown>}
                            </RequestContainer>

                        </Content>
                        <Content active={active === "applied"}>
                            <div>
                                {diff <= 0 ?
                                    requests ? (
                                    handleFilterAppliedRequests()
                                ) : (
                                    <SpinnerContainer>
                                        <Spinner/>
                                    </SpinnerContainer>
                                ) :
                                    <RequestCountDown>{diff} days until next donation.</RequestCountDown>}
                            </div>
                        </Content>
                    </DashboardContentContainer>
                </LeftSide>

                    <RightSide>{userObj ? <DonorProfileCardWide userObj={userObj}/> : null}</RightSide>
                </PageWrapper>
            </PageContainer>
        );
    }
;

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        userProfileReducer: state.userProfileReducer,
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(DonorDashboard);
