import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { BaseStatusButton } from "../../style/GlobalButtons/";
import { rem } from "polished";

const BarWrapper = styled.div`
  width: 445px;
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

const DonorSubBar = styled.div`
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

const GenericSeekerRequestBar = () => {
  const [showDonor, setDonorBar] = useState(false);

  const showDonorHandler = (event) => {
    setDonorBar(!showDonor);
  };

  return (
    <BarWrapper>
      <RequestBar onClick={showDonorHandler}>
        Request 10
        <BlueButton>Open</BlueButton>
        <BarArrowRight></BarArrowRight>
      </RequestBar>
      {showDonor ? (
        <>
          <DonorSubBar active={false}>Edina</DonorSubBar>
          <DonorSubBar active={false}>Antonio</DonorSubBar>
        </>
      ) : null}
    </BarWrapper>
  );
};

export default GenericSeekerRequestBar;
