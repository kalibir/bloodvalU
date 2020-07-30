import React, {useEffect, useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {PageContainer} from "../../style/GlobalWrappers";
import GenericSeekerRequestBar, {
    ArrowWrapper,
    BloodDiv,
    ButtonWrapper,
    IconWrapper, RenewWrapper,
    RequestBar, Separator,
    TextWrapper,
    UrgentWrapper
} from "../GenericSeekerRequestBar";
import {DarkBlueButton} from "../../style/GlobalButtons";
import RequestModal from "../RequestModal";
import {connect} from "react-redux";
import {
    assignApplicantAsSelectedDonor,
    deleteRequestAction,
    editRequestAction,
    getSeekerBloodRequestsAction,
} from "../../store/actions/bloodRequestActions";
import ActiveProfileCard from "./ActiveProfileCard";

import Spinner from "../../components/GenericSpinner";
import Tooltip from "@material-ui/core/Tooltip";

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LeftSide = styled.div`
  height: 100%;
  min-width: 576px;
  width: 100%;  //07.30 mod
  padding-top: ${rem("36px")};
  padding-left: ${rem("160px")};
  //padding-right: ${rem("85px")};
  padding-right: ${rem("160px")};  //07.30 mod
 
`;

const RightSide = styled.div`
    width: ${rem("700px")};
    height: 100%;
`;

const MenuContainer = styled.div`
    width: 100%;
    height: ${rem("48px")};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: ${rem("32px")};
`;

const MiddleButton = styled.button`
  cursor: pointer;
  height: 100%;
  width: 34%;
  position: relative;
  background-color: #ffffff;
  font-weight: 500;
  font-size: ${rem("14px")};
  color: ${(props) => (props.active ? "#121213" : "#A1A4B1")};
  border: none;
  border-top: 2px solid #ffffff;
  text-transform: capitalize;

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

  :hover {
    color: #121213;
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
    //width: 600px;
    width: 100%;  //07.30 mod
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    overflow: auto;
    max-height: ${rem("490px")};
    margin-bottom: ${rem("32px")};
`;

const Requests = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
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

const RequestBarTitle = styled(RequestBar)`
  cursor: none;
  height: 40px;
  font-weight: 500;
`

const SeekerDashboard = ({dispatch, userProfileReducer: {requests}, authReducer: {userObj}}) => {
    const [active, setActive] = useState("OP");
    const [activeProfile, setActiveProfile] = useState(null);
    const [activeRequest, setActiveRequest] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [modal, setModal] = useState({
        showModal: false,
        modalData: null,
    });

    const handleSetActiveProfile = (profileObj) => {
        setActiveProfile(profileObj);
    };

    const handleSetActiveRequest = (requestObj) => {
        setActiveRequest(requestObj);
    };

    const handleSelectApplicant = async (e) => {
        if (activeRequest && activeProfile) {
            setShowSpinner(true)
            const response = await dispatch(
                assignApplicantAsSelectedDonor(activeRequest.id, activeProfile.id)
            );
            if (response.status < 300)
                setShowSpinner(false)
            setActiveRequest(response.data);
        }
    };

    useEffect(() => {
        dispatch(getSeekerBloodRequestsAction(""));
    }, [dispatch]);

    const handleClick = (e) => {
        const value = e.target.id;
        setActive(value);
        dispatch(getSeekerBloodRequestsAction(value));
    };

    const closeModal = () => {
        setModal({...modal, showModal: false});
    };

    const handleShowEditModal = (event, requestObj) => {
        setModal({showModal: true, modalData: requestObj});
    };

    const handleEditRequest = (event, requestID, requestData) => {
        dispatch(editRequestAction(requestID, requestData));
        setModal({...modal, showModal: false});
    };

    return (
        <PageContainer>
            <PageWrapper>
                {modal.showModal ? (
                    <RequestModal
                        handleEditRequest={handleEditRequest}
                        modalData={modal.modalData}
                        closeModal={closeModal}
                    />
                ) : null}

                <LeftSide>
                    <DashboardContentContainer>
                        <MenuContainer>
                            <SideButton id="OP" onClick={handleClick} active={active === "OP"}>
                                Open
                            </SideButton>
                            <MiddleButton id="CL" onClick={handleClick} active={active === "CL"}>
                                On Going
                            </MiddleButton>
                            <SideButton id="COM" onClick={handleClick} active={active === "COM"}>
                                Complete
                            </SideButton>
                        </MenuContainer>
                        <Requests>

                                <RequestBarTitle>
                                    <TextWrapper>Request No.</TextWrapper>
                                    <IconWrapper>
                                        <Separator>Delete</Separator>
                                        <Separator>Edit</Separator>
                                    </IconWrapper>
                                    <ButtonWrapper>Status</ButtonWrapper>
                                    <UrgentWrapper>Urgency</UrgentWrapper>
                                    <BloodDiv>Blood-type</BloodDiv>
                                    <RenewWrapper>Renewable</RenewWrapper>
                                    <ArrowWrapper>More info</ArrowWrapper>
                                </RequestBarTitle>
                            {requests ? (
                                requests.map((request, index) => {
                                    if (request.status === active) {
                                        return (
                                            <GenericSeekerRequestBar
                                                handleShowEditModal={handleShowEditModal}
                                                handleEditRequest={handleEditRequest}
                                                handleSetActiveRequest={handleSetActiveRequest}
                                                handleSetActiveProfile={handleSetActiveProfile}
                                                key={index}
                                                request={request}
                                            />
                                        );
                                    }
                                })
                            ) : (
                                <Spinner/>
                            )}
                        </Requests>
                    </DashboardContentContainer>
                    {userObj && userObj.is_valid ?
                    <NewRequestButton onClick={() => setModal({...modal, showModal: true, modalData: null})}>
                        <PlusSignButton/>+ Create Request
                    </NewRequestButton>
                        :
                        <Tooltip title="You have to be validated to use this function." arrow><NewRequestButton >Not allowed</NewRequestButton></Tooltip>}

                </LeftSide>
                {/*<RightSide>*/}
                {/*    {activeProfile && activeRequest ? (*/}
                {/*        <ActiveProfileCard*/}
                {/*            handleSelectApplicant={handleSelectApplicant}*/}
                {/*            activeRequest={activeRequest}*/}
                {/*            activeProfile={activeProfile}*/}
                {/*            showSpinner={showSpinner}*/}
                {/*        />*/}
                {/*    ) : null}*/}
                {/*</RightSide>*/}
            </PageWrapper>
        </PageContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        userProfileReducer: state.userProfileReducer,
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(SeekerDashboard);
