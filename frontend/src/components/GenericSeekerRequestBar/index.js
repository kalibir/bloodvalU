import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { BaseStatusButton } from "../../style/GlobalButtons/";
import { rem } from "polished";

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

const GenericSeekerRequestBar = (props) => {
    console.log("status", props.status)
  const [showDonor, setDonorBar] = useState(false);

  const showDonorHandler = (event) => {
    setDonorBar(!showDonor);
  };

  let selected_donor_id = 1
    let donorObj_id = 2

  // const [status, setStatus] = useState("OP");
  //
  //   const handleSelectButton = (e) => {
  //       setStatus("CL")
  //   }
  //
  //   const handleUnSelectButton = (e) => {
  //       setStatus("OP")
  //   }

  return (
    <BarWrapper>
      <RequestBar onClick={showDonorHandler}>
        Request 10
        <BlueButton>Open</BlueButton>
        <BarArrowRight></BarArrowRight>
      </RequestBar>
      {showDonor ? (
        <>
            {props.status === "OP"
            ? <DonorSubBar active={false}>userObj.name</DonorSubBar>
            : props.status === "CL" && selected_donor_id === donorObj_id
                ? <DonorSelectedBar>donorObj.name</DonorSelectedBar>
            : <DonorNotSelected>donorObj.name</DonorNotSelected>}
        </>
      ) : null}
    </BarWrapper>
  );
};

export default GenericSeekerRequestBar;
