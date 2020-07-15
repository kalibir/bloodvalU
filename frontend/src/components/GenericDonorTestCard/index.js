import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import {SmallBlueButton} from "../../style/GlobalButtons";

const TestCard = styled.div`
    width: ${rem("192px")};
    height: ${rem("95px")};
    background: #FFFFFF;
    border: 1px solid #D3D4D8;
    border-radius: 4px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`;

const Text = styled.p`
    width: ${rem("144px")};
    height: ${rem("20px")};
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 22px;
    color: #121232;
`;

const TextContainer = styled.div`
    width: ${rem("144px")};
    height: ${rem("20px")};
`;

const BottomContainer = styled.div`
    height: ${rem("24px")};
    width: ${rem("160px")};
    display: flex;
`;

const PointContainer = styled.div`
    width: ${rem("56px")};
    height: ${rem("20px")};
    font-weight: 500;
    font-size: 9px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.16px;
    color: #43A047;
    border: 1px solid #71B774;
    border-radius: 4px;
    margin-left: ${rem("32px")};
`;

const GenericDonorTestCard = (props) => {
  return (
      <TestCard>
            <TextContainer>
                <Text>
                FREE Blood Test Type
            </Text>
            <Text>
                from Company
            </Text>
            </TextContainer>
            <BottomContainer>
                <SmallBlueButton>Buy</SmallBlueButton>
                <PointContainer>8000 Points</PointContainer>
            </BottomContainer>
      </TestCard>
  );
};

export default GenericDonorTestCard;