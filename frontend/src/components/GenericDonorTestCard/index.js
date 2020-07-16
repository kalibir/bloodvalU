import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import {SmallBlueButton, SmallGreenButton} from "../../style/GlobalButtons";

const ColorDebug = false;  //at true all element get colored background for checking

const TestCard = styled.div`
    width: ${rem("192px")};
    height: ${rem("96px")};
    //background: #FFFFFF;
    border: 1px solid #D3D4D8;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 ${rem("12px")} ${rem("12px")} 0;
    background-color: ${ColorDebug ? "darkkhaki" : "#FFFFFF"};
`;

const TestCardContent = styled.div`
    width: ${rem("160px")};
    height: ${rem("80px")};
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-start;
    background-color: ${ColorDebug ? "deepskyblue" : ""};
`

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${ColorDebug ? "darkorange" : ""}; 
`

const Text = styled.div`
    font-style: normal;
    font-weight: 300;
    font-size: ${rem("14px")};
    line-height: ${rem("18px")};
    color: #121232;
`

const ValidText = styled.div`
    color: #121232;
    font-weight: 400;
    font-size: ${rem("12px")};
`

const ValidDate = styled.span`
    color: ${(props) => (props.active ? "#c60f24" : "#43A047")};
    font-weight: 500;
    font-size: ${rem("12px")};
    margin-left: ${rem("8px")};
`

const TestCardBottomContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: ${(props) => (props.active ? "center" : "space-between")};
    background-color: ${ColorDebug ? "burlywood" : ""};
`

const PointContainer = styled.div`
    width: ${rem("72px")}; //set width only for standardized looking
    height: ${rem("20px")};
    font-weight: 500;
    font-size: ${rem("9px")};
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: flex-end;  //set flex-end only for standardized looking
    letter-spacing: 0.16px;
    color: #43A047;
    border: 1px solid #71B774;
    border-radius: 4px;
    text-transform: uppercase;
`;

const ExpiredText = styled(PointContainer)`
    font-size: ${rem("11px")};
    color: #c60f24;
    border: 1px solid #c60f24;
    justify-content: center;
`

const RedeemButton = styled(SmallGreenButton)`
    width: auto;
    padding: 0 8px;
    letter-spacing: 3.5px;
`

export const GenericDonorTestCard = (props) => {
    console.log("Testcard props", props);
    const { test: { test_type, seeker_name, is_bought, points_cost, expiry_date, is_expired }, } = props;


  return (
      <TestCard>
        <TestCardContent>
            <TextContainer>
                <Text>{test_type}</Text>
                <Text>From: {seeker_name}</Text>
                <ValidText>Valid until: <ValidDate active={is_expired}>{expiry_date}</ValidDate></ValidText>
            </TextContainer>
            {/*{is_bought ? <div>first is true</div> : is_expired ? <div>first is false</div> : <div>second is false</div>}*/}
            <TestCardBottomContainer active={is_bought}>
                {is_bought ? is_expired ? <ExpiredText>Expired</ExpiredText> : <RedeemButton>Re-send Code</RedeemButton> : <><SmallBlueButton>Buy</SmallBlueButton><PointContainer>{points_cost} Points</PointContainer></>}
            </TestCardBottomContainer>
        </TestCardContent>
      </TestCard>
  );
};

//
// const Text = styled.p`
//     width: ${rem("144px")};
//     height: ${rem("20px")};
//     font-style: normal;
//     font-weight: 300;
//     font-size: 14px;
//     line-height: 22px;
//     color: #121232;
// `;
//
// const TextContainer = styled.div`
//     width: ${rem("144px")};
//     height: ${rem("20px")};
// `;
//
// const BottomContainer = styled.div`
//     height: ${rem("24px")};
//     width: ${rem("160px")};
//     display: flex;
// `;
//
// const PointContainer = styled.div`
//     width: ${rem("64px")};
//     height: ${rem("20px")};
//     font-weight: 500;
//     font-size: 9px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     letter-spacing: 0.16px;
//     color: #43A047;
//     border: 1px solid #71B774;
//     border-radius: 4px;
//     margin-left: ${rem("32px")};
//     text-transform: uppercase;
// `;

// export const GenericDonorTestCard = (props) => {
//   return (
//       <TestCard>
//             <TextContainer>
//                 <Text>
//                 FREE Blood Test Type
//             </Text>
//             <Text>
//                 from Company
//             </Text>
//             </TextContainer>
//             <BottomContainer>
//                 <SmallBlueButton>Buy</SmallBlueButton>
//                 <PointContainer>8000 Points</PointContainer>
//             </BottomContainer>
//       </TestCard>
//   );
// };

// export default GenericDonorTestCard;