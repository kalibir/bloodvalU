import React from "react";
import {useState} from "react";
import styled, {keyframes} from "styled-components";
import {BaseStatusButton, CompleteButton} from "../../style/GlobalButtons/";
import {rem} from "polished";
import {useDispatch} from "react-redux";
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
import renewIcon from "../../assets/icons/renew.svg";
import Tooltip from "@material-ui/core/Tooltip";

const BarWrapper = styled.div`
  width: 100%;
`;

const RequestBar = styled.div`
  display: grid;
  width: 100%;
  height: 48px;
  grid-template-areas: "text edit button urgent blood renew arrow";
  grid-template-columns: 2fr 1fr 1.5fr 1fr 35px 1fr 1fr;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  align-items: center;
  grid-gap: 8px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  display: flex;
  height: 100%;
  grid-area: text;
  align-items: center;
  padding-left: 24px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  grid-area: button;
  height: 38px;
  //background-color: lightgreen;
`;

const IconWrapper = styled(ButtonWrapper)`
  grid-area: edit;
  display: flex;
  align-items: center;
  justify-content: space-around;
  //background-color: orangered;
`;

const UrgentWrapper = styled.div`
  grid-area: urgent;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  //background-color: darkgrey;
`
const BloodDiv = styled(UrgentWrapper)`
  grid-area: blood;
  display: flex;
  width: 100%;
  //background-color: deepskyblue;
`
const RenewWrapper = styled(UrgentWrapper)`
  grid-area: renew;
  display: flex;
  width: 100%;
  //background-color: darkolivegreen;
`

const BlueButton = styled(BaseStatusButton)`
  height: 37px;
  font-weight: 500;
  letter-spacing: 1.5px;
  background-color: #2196f3;
`;

const IconButton = styled.button`
  border: 3px solid #2196f3;
  padding: 3px;
  margin-right: 8px;
  width: 37px;
  height: 37px;
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
  border: 3px solid red;  
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
  //background-color: darksalmon;
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
  width: ${rem("38px")};
  height: ${rem("38px")};
`;

const CompleteItButton = styled(CompleteButton)`
  height: 37px;
  font-weight: 500;
  letter-spacing: 1.5px;
  
  :hover {
    border: 3px solid #43a047;
  }
`

const CompletedButton = styled(CompleteButton)`
  height: 37px;
  color: #43a047;
  background: #ffffff;
  border: 3px solid #43a047;
  font-weight: 500;
  letter-spacing: 1.5px;
  
  :hover {
    color: #43a047;
    background: #ffffff;
    border: 3px solid #43a047;
  }
`


//The seeker request bar starts from here

const GenericSeekerRequestBar = ({
                                     handleShowEditModal,
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

    const closeModal = () => {
        setSureModal(false);
    };

    const handleClickApplicant = (e) => {
        const index = Number(e.currentTarget.id);
        const targetProfile = applicantsData.applicants[index];
        handleSetActiveProfile(targetProfile);
        // handleSetActiveRequest(request)
    };

    const handleDeleteRequest = async (e, requestID) => {
        e.preventDefault();
        const response = await dispatch(deleteRequestAction(requestID));
        if (response.status < 300) closeModal();
    };

    const handleCompleteRequest = async (e) => {
        e.preventDefault();
        const response = dispatch(markRequestAsCompleteAction(request.id));
        if (response.status < 300) closeModal();
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
                    {request.status != "COM" ? (
                        <>
                    <Tooltip title="Delete request." arrow><IconButton2 onClick={(e) => setSureModal(true)}>&#10006;</IconButton2></Tooltip>
                    <Tooltip title="Edit request." arrow><IconButton onClick={(e) => handleShowEditModal(e, request)}>&#9998;</IconButton></Tooltip>
                        </>) : null}
                </IconWrapper>

                <ButtonWrapper>
                    {request.status === "OP" ? (
                        <Tooltip title="Request is open currently." arrow><BlueButton>Open</BlueButton></Tooltip>
                    ) : request.status === "CL" ? (
                        <CompleteItButton onClick={handleCompleteRequest}>Mark As Complete</CompleteItButton>
                    ) : (
                        <Tooltip title="Request is completed." arrow><CompletedButton onClick={handleRenderApplicants}>Completed</CompletedButton></Tooltip>
                    )}
                </ButtonWrapper>

                <UrgentWrapper onClick={handleRenderApplicants}>{request.is_urgent ?
                    <Tooltip title="This request is urgent." arrow><UrgentIcon src={urgentIcon}/></Tooltip> : null}</UrgentWrapper>
                <BloodDiv onClick={handleRenderApplicants}><Tooltip title="Blood-group of request." arrow><Type src={renderBloodType()} alt="blood_type"/></Tooltip></BloodDiv>
                <Tooltip title="Request renew itself after current one is done." arrow><RenewWrapper onClick={handleRenderApplicants}>{request.is_renewable ?
                    <UrgentIcon src={renewIcon}/> : null}</RenewWrapper></Tooltip>

                {request.no_of_applicants ? (
                    <Tooltip title="Click for more information." arrow><ArrowWrapper onClick={handleRenderApplicants}>
                        <BarArrowRight
                            style={openArrow ? {transform: "rotate(45deg)"} : {transform: "rotate(-45deg)"}}/>
                    </ArrowWrapper></Tooltip>
                ) : (
                    <EmptyArrowWrapper/>
                )}

            </RequestBar>

            {applicantsData.applicants && openArrow
                ? applicantsData.applicants.map((applicant, index) => {

                    if (request.selected_donor && request.selected_donor.id === applicant.id) {
                        return (
                            <SlidingContainer>
                                <DonorSelectedBar
                                    name={"selectbar"}
                                    onClick={handleClickApplicant}
                                    key={index}
                                    id={index}
                                    active={
                                        false
                                    }>{`${applicant.unique_donor_id}`}
                                </DonorSelectedBar>
                            </SlidingContainer>
                        );
                    }

                    return (
                        <SlidingContainer>
                            <DonorSubBar
                                name={"selectbar2"}
                                onClick={request.status === "COM" ? null : handleClickApplicant}
                                key={index}
                                id={index}
                                active={false}>{`${applicant.first_name} ${applicant.last_name}`}
                            </DonorSubBar>
                        </SlidingContainer>
                    );
                })
                : applicantsData.applicants && !openArrow ? null
                    : null}
        </BarWrapper>
    );
};

export default GenericSeekerRequestBar;
