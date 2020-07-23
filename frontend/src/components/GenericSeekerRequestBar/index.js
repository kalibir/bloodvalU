import React from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { BaseStatusButton, CompleteButton } from "../../style/GlobalButtons/";
import { rem } from "polished";
import { useDispatch } from "react-redux";
import {
  deleteRequestAction,
  getApplicantsOfRequestAction,
  markRequestAsCompleteAction,
} from "../../store/actions/bloodRequestActions";
import AreYouSureModal from "../AreYouSure";

const BarWrapper = styled.div`
  width: 100%;
`;
const RequestBar = styled.div`
  display: grid;
  width: 100%;
  height: 48px;
  grid-template-areas: "text status urgent blood button valid arrow";
  grid-template-columns: 2fr 1fr 1fr 35px 30% 1fr 1fr;
  background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;
  align-items: center;
  justify-items: auto;
  grid-gap: 8px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  display: flex;
  height: 100%;
  grid-area: text;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  grid-area: button;
`;

const IconWrapper = styled(ButtonWrapper)`
  grid-area: urgent;
  width: 100px;
  justify-content: space-between;
`;

const BlueButton = styled(BaseStatusButton)`
  background-color: #2196f3;
`;

const IconButton = styled.button`
  border: 1px solid black;
  padding: 3px;
  margin-right: 8px;
  width: 30px;
  background-color: black;
  border-radius: 50%;
  color: white;
  cursor: pointer;

  :hover {
    background-color: white;
    color: black;
  }
`;

const ArrowWrapper = styled.div`
  grid-area: arrow;
  justify-self: end;
  margin-right: 24px;
`;

const EmptyArrowWrapper = styled.div`
  width: 20px;
  height: 20px;
`;

const BarArrowRight = styled.i`
  border: solid #757575;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
`;

export const DonorSubBar = styled.div`
  width: 100%;
  height: 48px;
  border-left: ${(props) => props.active && "13px solid #2196F3"};
  background-color: #3e465f;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 23px;
  padding-right: 27px;
  cursor: pointer;
  color: white;
`;

const slideAnimation = keyframes`
from { max-height: 0; overflow: hidden}
to{ max-height: 300px; transition: max-height 5s;}
`;

const SlidingContainer = styled.div`
  animation: 1s ${slideAnimation};
`;

const DonorSelectedBar = styled(DonorSubBar)`
  background: #43a047;
`;

const DonorNotSelected = styled(DonorSubBar)`
  background: #c6c6c6;
`;

const GenericSeekerRequestBar = ({
  handleShowEditModal,
  handleDeleteRequest,
  handleSetActiveRequest,
  handleSetActiveProfile,
  request,
}) => {
  const dispatch = useDispatch();

  const [applicantsData, setApplicantsData] = useState({
    showApplicants: false,
    applicants: null,
  });
  const [sureModal, setSureModal] = useState(false);

  // const handleDeleteRequest = (event, requestID) => {
  //   dispatch(deleteRequestAction(requestID));
  // };

  const handleRenderApplicants = async (e) => {
    const response = await dispatch(getApplicantsOfRequestAction(request.id));
    handleSetActiveRequest(request);
    setApplicantsData({
      ...applicantsData,
      applicants: response.data,
      showApplicants: !applicantsData.showApplicants,
    });
  };

  const handleClickApplicant = (e) => {
    const index = Number(e.currentTarget.id);
    const targetProfile = applicantsData.applicants[index];
    handleSetActiveProfile(targetProfile);
    // handleSetActiveRequest(request)
  };

  const handleCompleteRequest = (e) => {
    dispatch(markRequestAsCompleteAction(request.id));
  };

  const closeModal = () => {
    console.log("in the close modal");
    setSureModal(false);
  };

  return (
    <BarWrapper>
      {sureModal ? (
        <AreYouSureModal
          handleDeleteRequest={handleDeleteRequest}
          closeModal={closeModal}
          id={request.id}
          context={"request"}
        />
      ) : null}
      <RequestBar>
        <TextWrapper> Request {request.id}</TextWrapper>
        <IconWrapper>
          <IconButton onClick={(e) => setSureModal(true)}>&#10006;</IconButton>
          <IconButton onClick={(e) => handleShowEditModal(e, request)}>&#9998;</IconButton>
        </IconWrapper>
        <ButtonWrapper>
          {request.status === "OP" ? (
            <BlueButton>Open</BlueButton>
          ) : request.status === "CL" ? (
            <CompleteButton onClick={handleCompleteRequest}>Complete request</CompleteButton>
          ) : (
            <CompleteButton>Complete</CompleteButton>
          )}
        </ButtonWrapper>
        {request.no_of_applicants ? (
          <ArrowWrapper onClick={handleRenderApplicants}>
            <BarArrowRight />
          </ArrowWrapper>
        ) : (
          <EmptyArrowWrapper />
        )}
      </RequestBar>

      {applicantsData.showApplicants
        ? applicantsData.applicants.map((applicant, index) => {
            if (request.selected_donor) {
              if (request.selected_donor.id === applicant.id) {
                return (
                  <DonorSelectedBar
                    name={"selectbar"}
                    onClick={handleClickApplicant}
                    key={index}
                    id={index}
                    active={
                      false
                    }>{`${applicant.first_name} ${applicant.last_name}`}</DonorSelectedBar>
                );
              }
            }
            return (
              <SlidingContainer>
                <DonorSubBar
                  name={"selectba2"}
                  onClick={request.status === "COM" ? null : handleClickApplicant}
                  key={index}
                  id={index}
                  active={false}>{`${applicant.first_name} ${applicant.last_name}`}</DonorSubBar>
              </SlidingContainer>
            );
          })
        : null}
    </BarWrapper>
  );
};

export default GenericSeekerRequestBar;
