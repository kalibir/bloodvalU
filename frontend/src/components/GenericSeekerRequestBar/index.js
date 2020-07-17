import React from "react";
import {useState} from "react";
import styled from "styled-components";
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
  cursor: pointer;
`;

const BlueButton = styled(BaseStatusButton)`
  background-color: #2196f3;
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

const DonorSelectedBar = styled(DonorSubBar)`
    background: #43A047;
`;

const DonorNotSelected = styled(DonorSubBar)`
    background: #C6C6C6;
`;

const GenericSeekerRequestBar = ({  handleSetActiveRequest,
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
        console.log("applicants", applicantsData.applicants)
        handleSetActiveRequest(request)
        setApplicantsData({
            ...applicantsData,
            applicants: response.data,
            showApplicants: !applicantsData.showApplicants
        })
    }

    const handleClickApplicant = e => {
        const index = e.currentTarget.id
        const targetProfile = applicantsData.applicants[index]
        handleSetActiveProfile(targetProfile)
        handleSetActiveRequest(request)
    }


    return (
        <BarWrapper>
            <RequestBar onClick={handleRenderApplicants}>
                Request {request.id}
                {request.status === "OP"
                    ? <BlueButton>Open</BlueButton>
                    : request.status === "CL"
                        ? <CompleteButton>Complete request</CompleteButton>
                        : <CompleteButton>Complete</CompleteButton>}
                <BarArrowRight/>
            </RequestBar>
            {applicantsData.showApplicants ? applicantsData.applicants.map((applicant, index) => {
                    return (<DonorSubBar onClick={handleClickApplicant} key={index} id={index}
                                         active={false}>{`${applicant.first_name} ${applicant.last_name}`}</DonorSubBar>)
                })

                // <>
                //     {props.status === "OP"
                //         ? <DonorSubBar active={false}>donorObj.name</DonorSubBar>
                //         : props.status === "CL" && selected_donor_id === donorObj_id
                //             ? <DonorSelectedBar>donorObj.name</DonorSelectedBar>
                //             : <DonorNotSelected>donorObj.name</DonorNotSelected>}
                // </>
                : null}
        </BarWrapper>
    );
};

export default GenericSeekerRequestBar;
