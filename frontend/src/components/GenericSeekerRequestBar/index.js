import React from "react";
import {useState} from "react";
import styled, { keyframes } from "styled-components";
import {BaseStatusButton, CompleteButton} from "../../style/GlobalButtons/";
import {rem} from "polished";
import {useDispatch} from "react-redux";
import {getApplicantsOfRequestAction} from "../../store/actions/bloodRequestActions";

const BarWrapper = styled.div`
  width: 100%;
`;
const RequestBar = styled.div`
  width: 100%;
  height: 48px;
  background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 23px;
  padding-right: 27px;
`;

const BlueButton = styled(BaseStatusButton)`
  background-color: #2196f3;
`;

const ArrowWrapper = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const EmptyArrowWrapper = styled.div`
  width: 20px;
  height: 20px;
`

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

const SlidingContainer = styled.div`
  @keyframes breath-animation {
 0% { height: 100px; width: 100px; }
 30% { height: 400px; width: 400px; opacity: 1 }
 40% { height: 405px; width: 405px; opacity: 0.3; }
 100% { height: 100px; width: 100px; opacity: 0.6; }
}
`

const DonorSelectedBar = styled(DonorSubBar)`
    background: #43A047;
`;

const DonorNotSelected = styled(DonorSubBar)`
    background: #C6C6C6;
`;

const GenericSeekerRequestBar = ({
                                     handleSetActiveRequest,
                                     handleSetActiveProfile,
                                     request
                                 }) => {
    const dispatch = useDispatch()

    const [applicantsData, setApplicantsData] = useState({
        showApplicants: false,
        applicants: null,
    })

    const handleRenderApplicants = async (e) => {
        const response = await dispatch(getApplicantsOfRequestAction(request.id))
        handleSetActiveRequest(request)
        setApplicantsData({
            ...applicantsData,
            applicants: response.data,
            showApplicants: !applicantsData.showApplicants
        })
    }

    const handleClickApplicant = e => {
        const index = Number(e.currentTarget.id)
        const targetProfile = applicantsData.applicants[index]
        handleSetActiveProfile(targetProfile)
        // handleSetActiveRequest(request)
    }

    console.log("the status of the request in the request CARD", request.status)


    return (
        <BarWrapper>
            <RequestBar>
                Request {request.id}
                {request.status === "OP"
                    ? <BlueButton>Open</BlueButton>
                    : request.status === "CL"
                        ? <CompleteButton>Complete request</CompleteButton>
                        : <CompleteButton>Complete</CompleteButton>}
                {request.no_of_applicants ?
                    <ArrowWrapper onClick={handleRenderApplicants}><BarArrowRight/></ArrowWrapper> :
                    <EmptyArrowWrapper/>}
            </RequestBar>

            {applicantsData.showApplicants ? applicantsData.applicants.map((applicant, index) => {
                    if(request.selected_donor) {
                        if(request.selected_donor.id === applicant.id) {
                            return (<DonorSelectedBar onClick={handleClickApplicant} key={index} id={index}
                                                           active={false}>{`${applicant.first_name} ${applicant.last_name}`}</DonorSelectedBar>)
                        }
                    }
                    return (<DonorSubBar onClick={handleClickApplicant} key={index} id={index}
                                                           active={false}>{`${applicant.first_name} ${applicant.last_name}`}</DonorSubBar>)
                })
                : null}
        </BarWrapper>
    );
};

export default GenericSeekerRequestBar;
