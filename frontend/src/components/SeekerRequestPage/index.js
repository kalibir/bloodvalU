import React, {useEffect, useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {PageContainer} from "../../style/GlobalWrappers";
import GenericSeekerRequestBar from "../GenericSeekerRequestBar";
import {DarkBlueButton} from "../../style/GlobalButtons";
import RequestModal from "../RequestModal";
import {connect} from "react-redux";
import {
    assignApplicantAsSelectedDonor,
    getSeekerBloodRequestsAction,
    updateRequestInAll
} from "../../store/actions/bloodRequestActions";
import ActiveProfileCard from "./ActiveProfileCard";

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
  background-color: #ffffff;
  font-weight: 500;
  font-size: ${rem("14px")};
  color: ${(props) => (props.active ? "#121213" : "#A1A4B1")};
  border: none;
  border-top: 2px solid #ffffff;
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
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    overflow: auto;
    max-height: ${rem("560px")};
    margin-bottom: ${rem("32px")};
`;

const Requests = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlusSignButton = styled.span`
  color: #ffffff;
  width: ${rem("9.3px")};
  height: ${rem("9.3px")};
  margin-right: ${rem("10px")};
`;

const NewRequestButton = styled(DarkBlueButton)`
  width: ${rem("194px")};
`;

const SeekerDashboard = ({dispatch, userProfileReducer: {requests}}) => {

    const [active, setActive] = useState("OP");
    const [activeProfile, setActiveProfile] = useState(null);
    const [activeRequest, setActiveRequest] = useState(null);
    const [modalActive, setModalActive] = useState(false);

    const handleSetActiveProfile = (profileObj) => {
        setActiveProfile(profileObj)
    }

    const handleSetActiveRequest = (requestObj) => {
        setActiveRequest(requestObj)
    }

    const handleSelectApplicant = async e => {
        if (activeRequest.id) {
            const response = await dispatch(assignApplicantAsSelectedDonor(activeRequest.id, activeProfile.id))
            if (response.status < 300) setActiveRequest(response.data)
        }
    }

    useEffect(() => {
        dispatch(getSeekerBloodRequestsAction())
    }, [dispatch])

    const handleClick = (e) => {
        const value = e.target.id;
        setActive(value);
    };


    const closeModal = () => {
        console.log("in the close modal")
        setModalActive(false)
    }


    return (
        <PageContainer>
            <PageWrapper>
                {modalActive ? <RequestModal closeModal={closeModal}/> : null}
                <LeftSide>
                    <DashboardContentContainer>
                        <MenuContainer>
                            <SideButton id="OP" onClick={handleClick} active={active === "OP"}>
                                Open
                            </SideButton>
                            <MiddleButton id="COM" onClick={handleClick} active={active === "COM"}>
                                Complete
                            </MiddleButton>
                            <SideButton id="CL" onClick={handleClick} active={active === "CL"}>
                                Closed
                            </SideButton>
                        </MenuContainer>
                        <Requests>{requests ? requests.map((request, index) => {
                            return (<GenericSeekerRequestBar handleSetActiveRequest={handleSetActiveRequest}
                                                             handleSetActiveProfile={handleSetActiveProfile} key={index}
                                                             request={request}/>)
                        }) : null}</Requests>


                    </DashboardContentContainer>
                    <NewRequestButton onClick={() => setModalActive(true)}>
                        <PlusSignButton/>+ Create Request
                    </NewRequestButton>
                </LeftSide>
                <RightSide>
                    {activeRequest ?
                        <ActiveProfileCard handleSelectApplicant={handleSelectApplicant} activeRequest={activeRequest}
                                           activeProfile={activeProfile}/> : null}
                </RightSide>
            </PageWrapper>
        </PageContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        userProfileReducer: state.userProfileReducer,
    };
};

export default connect(mapStateToProps)(SeekerDashboard);

