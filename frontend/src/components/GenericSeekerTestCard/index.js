import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import {SmallBlueButton, SmallRedButton} from "../../style/GlobalButtons";

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
    font-weight: 500;
    font-size: 12px;
    line-height: 22px;
    color: #121232;
`;

const PointContainer = styled.div`
    width: ${rem("64px")};
    height: ${rem("20px")};
    font-weight: 500;
    font-size: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.16px;
    color: #43A047;
    border: 1px solid #71B774;
    border-radius: 4px;
    text-transform: uppercase;
`;

const TextContainer = styled.div`
    width: ${rem("144px")};
    height: ${rem("42px")};
    margin-right: ${rem("17px")};
`;

const BottomContainer = styled.div`
    height: ${rem("24px")};
    width: ${rem("144px")};
    display: flex;
    justify-content: space-between;
    margin-right: ${rem("16px")};
`;


const GenericSeekerTestCard = (props) => {
  return (
      <TestCard>
            <TextContainer>
                <Text>
                Blood Test Type
                </Text>
                <PointContainer>8000 points</PointContainer>
            </TextContainer>
            <BottomContainer>
                <SmallBlueButton>edit</SmallBlueButton>
                <SmallRedButton>delete</SmallRedButton>
            </BottomContainer>
      </TestCard>
  );
};

export default GenericSeekerTestCard;