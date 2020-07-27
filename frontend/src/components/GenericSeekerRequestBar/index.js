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
import O_negative from "../../assets/icons/O_negative.svg";
import O_positive from "../../assets/icons/O_positive.svg";
import A_negative from "../../assets/icons/A_negative.svg";
import A_positive from "../../assets/icons/A_positive.svg";
import B_negative from "../../assets/icons/B_negative.svg";
import B_positive from "../../assets/icons/B_positive.svg";
import AB_negative from "../../assets/icons/AB_negative.svg";
import AB_positive from "../../assets/icons/AB_positive.svg";
import urgentIcon from "../../assets/icons/urgent.svg";

const BarWrapper = styled.div`
  width: 100%;
`;

const RequestBar = styled.div`
  display: grid;
  width: 100%;
  height: 48px;
  grid-template-areas: "text edit button urgent blood renew arrow";
  grid-template-columns: 2fr 1fr 1fr 1fr 35px 1fr 1fr;
  background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;
  align-items: center;
  grid-gap: 8px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  display: flex;
  height: 100%;
  grid-area: text;
  align-items: center;
  background-color: lightgreen;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  grid-area: button;
`;

const IconWrapper = styled(ButtonWrapper)`
  grid-area: edit;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: orangered;
`;

const UrgentWrapper = styled.div`
  grid-area: urgent;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: darkgrey;
`
const BloodDiv = styled(UrgentWrapper)`
  grid-area: blood;
  display: flex;
  width: 100%;
  background-color: deepskyblue;
`
const RenewWrapper = styled(UrgentWrapper)`
  grid-area: renew;
  display: flex;
  width: 100%;
  background-color: darkolivegreen;
`

const BlueButton = styled(BaseStatusButton)`
  background-color: #2196f3;
`;

const IconButton = styled.button`
  border: 1px solid #2196f3;
  padding: 3px;
  margin-right: 8px;
  width: 30px;
  border-radius: 50%;
  background-color: white;
  color: #2196f3;
  cursor: pointer;

  :hover {
    background-color: #2196f3;
    color: white;    
    border: 1px solid #2196f3;
  }
`;

const IconButton2 = styled(IconButton)`
  border: 1px solid red;  
  background-color: white;
  color: red;

  :hover {
    background-color: orangered;
    color: white;    
    border: 1px solid orangered;
  }
`;

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${rem("24px")};
  grid-area: arrow;
  margin-right: 24px;
  width: 100%;
  height: 100%;
  background-color: darksalmon;
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

const Type = styled.img`
  color: white;
`;

const UrgentIcon = styled.img`
  width: ${rem("30px")};
  height: ${rem("30px")};
`;


//The seeker request bar starts from here

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
  const [openArrow, setOpenArrow] = useState(false);

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
    setOpenArrow(!openArrow)
  };


  const handleClickApplicant = (e) => {
    const index = Number(e.currentTarget.id);
    const targetProfile = applicantsData.applicants[index];
    handleSetActiveProfile(targetProfile);
    // handleSetActiveRequest(request)
  };

  const handleCompleteRequest = async (e) => {
    e.preventDefault();
    const response = dispatch(markRequestAsCompleteAction(request.id));
     if (response.status < 300) closeModal();
  };

  const closeModal = () => {
    setSureModal(false);
  };

  const renderBloodType = () => {
    if (request.blood_group === "O-") return O_negative;
    if (request.blood_group === "O+") return O_positive;
    if (request.blood_group === "A-") return A_negative;
    if (request.blood_group === "A+") return A_positive;
    if (request.blood_group === "B-") return B_negative;
    if (request.blood_group === "B+") return B_positive;
    if (request.blood_group === "AB-") return AB_negative;
    if (request.blood_group === "AB+") return AB_positive;
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
        <TextWrapper onClick={handleRenderApplicants}> Request {request.id}</TextWrapper>

        <IconWrapper>
          <IconButton2 onClick={(e) => setSureModal(true)}>&#10006;</IconButton2>
          <IconButton onClick={(e) => handleShowEditModal(e, request)}>&#9998;</IconButton>
        </IconWrapper>

        <ButtonWrapper>
          {request.status === "OP" ? (
            <BlueButton>Open</BlueButton>
          ) : request.status === "CL" ? (
            <CompleteButton onClick={handleCompleteRequest}>Mark As Complete</CompleteButton>
          ) : (
            <CompleteButton>Completed</CompleteButton>
          )}
        </ButtonWrapper>

        <UrgentWrapper onClick={handleRenderApplicants}>{request.is_urgent ? <UrgentIcon src={urgentIcon} /> : null}</UrgentWrapper>
        <BloodDiv onClick={handleRenderApplicants}><Type src={renderBloodType()} alt="blood_type" /></BloodDiv>
        <RenewWrapper onClick={handleRenderApplicants}></RenewWrapper>

        {request.no_of_applicants ? (
          <ArrowWrapper onClick={handleRenderApplicants}>
            <BarArrowRight />
          </ArrowWrapper>
        ) : (
          <EmptyArrowWrapper />
        )}

      </RequestBar>

      {applicantsData.applicants && openArrow
        ? applicantsData.applicants.map((applicant, index) => {

              if (request.selected_donor && request.selected_donor.id === applicant.id) {
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

            return (
              // <SlidingContainer>
                <DonorSubBar
                  name={"selectbar2"}
                  onClick={request.status === "COM" ? null : handleClickApplicant}
                  key={index}
                  id={index}
                  active={false}>{`${applicant.first_name} ${applicant.last_name}`}</DonorSubBar>
              // </SlidingContainer>
            );
          })
        : applicantsData.applicants && !openArrow ? null
      : null}
    </BarWrapper>
  );
};

export default GenericSeekerRequestBar;
