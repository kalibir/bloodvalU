import React, {useEffect, useState} from "react";
import {rem} from "polished";
import {DarkBlueButton} from "../../style/GlobalButtons";
import styled from "styled-components";
import {PageContainer} from "../../style/GlobalWrappers";
import GenericSeekerTestCard from "../GenericSeekerTestCard";
import SeekerProfileCard from "../GenericSeekerProfileCard";
import {connect} from "react-redux";
import {deleteTestAction, editTestAction, getRequestsOfSeekerAction} from "../../store/actions/offeredTestActions";
import CreateTestModal from "../CreateTestModal";
import GenericSeekerRequestBar from "../GenericSeekerRequestBar";
import {deleteRequestAction, editRequestAction} from "../../store/actions/bloodRequestActions";

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fafafc;
  //border: 1px solid yellow;
`;

const DashboardPageContainer = styled(PageContainer)`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

const LeftSide = styled.div`
  height: 100%;
  width: 100%;
  min-width: 576px;
  padding-top: ${rem("36px")};
  padding-left: ${rem("160px")};
  //border: 1px solid red;
`;

const RightSide = styled.div`
    width: ${rem("544px")};
    //height: ${rem("628px")};
    height: 100%;
`;

const DashboardContentContainer = styled.div`
  width: 90%;
  display: flex;
  //border: 1px solid blue;
  flex-flow: column;
  justify-content: flex-start;
`;

const MenuContainer = styled.div`
    //width: ${rem("445px")};
    width: 25%;
    height: ${rem("48px")};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: ${rem("24px")};
`;
const MiddleButton = styled.button`
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  font-weight: 500;
  font-size: ${rem("14px")};
  border: none;
  border-top: 2px solid #ffffff;
  text-transform: capitalize;
`;

const TestWrapper = styled.div`
  width: 100%;
  overflow: auto;
  max-height: 600px;
  height: inherit;
  display: flex;
  flex-wrap: wrap; //DO NOT REMOVE THIS
`;

const SideButton = styled(MiddleButton)`
  width: 100%;
  color: #121213;
  border-bottom: 2px solid #121213;
`;

const CreateTestButton = styled(DarkBlueButton)`
  width: ${rem("194px")};
  margin-bottom: ${rem("24px")};
`;

const PlusSignButton = styled.span`
  color: #ffffff;
  width: ${rem("9.3px")};
  height: ${rem("9.3px")};
  margin-right: ${rem("10px")};
`;

const SeekerProfilePage = ({userProfileReducer: {offeredTests}, dispatch}) => {
    useEffect(() => {
        dispatch(getRequestsOfSeekerAction());
    }, []);

    const [modal, setModal] = useState({
        showModal: false,
        modalData: null,
    });

    const closeModal = () => {
        setModal({...modal, showModal: false});
    };

    const handleEditTest = (event, testID, testData) => {
        dispatch(editTestAction(testID, testData));
        setModal({...modal, showModal: false});
    };

    const handleShowEditModal = (event, testObj) => {
        setModal({showModal: true, modalData: testObj});
    };


    return (
        <PageWrapper>
            {modal.showModal ? <CreateTestModal modalData={modal.modalData}
                                                handleEditTest={handleEditTest}
                                                closeModal={closeModal}/> : null}
            <DashboardPageContainer>
                <LeftSide>
                    <DashboardContentContainer>
                        <MenuContainer>
                            <SideButton id="requests">Offered Tests</SideButton>
                        </MenuContainer>
                        <CreateTestButton onClick={() => setModal({...modal, modalData: null, showModal: true})}>+ Create
                            Test</CreateTestButton>
                        <TestWrapper>
                            {offeredTests
                                ? offeredTests.map((test, index) => {
                                    return <GenericSeekerTestCard
                                        test={test}
                                        handleShowEditModal={handleShowEditModal}
                                        handleEditTest={handleEditTest}
                                        key={index}
                                    />;
                                })
                                : null}
                        </TestWrapper>
                    </DashboardContentContainer>
                </LeftSide>
                <RightSide>
                    <SeekerProfileCard/>
                </RightSide>
            </DashboardPageContainer>
        </PageWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        userProfileReducer: state.userProfileReducer,
    };
};

export default connect(mapStateToProps)(SeekerProfilePage);
