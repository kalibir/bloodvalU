import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import {SmallBlueButton, SmallGreenButton} from "../../style/GlobalButtons";
import {applyToRequestActionInAll} from "../../store/actions/bloodRequestActions";
import {useDispatch} from "react-redux";
import {buyTestAction} from "../../store/actions/offeredTestActions";
import {getLoggedInUserAction} from "../../store/actions/userActions";

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

export const PointContainer = styled.div`
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

const GenericDonorTestCard = (props) => {
    console.log("Testcard props", props);
    const { test: { id, test_type, seeker_name, is_bought, points_cost, expiry_date, is_expired }, } = props;

    const dispatch = useDispatch();

    const handleBuy = async e => {
        console.log("in the test buy")
        console.log("testcard id", id)
        const response = await dispatch(buyTestAction(id))
        if(response.status < 300) dispatch(getLoggedInUserAction())
    }


  return (
      <TestCard>
        <TestCardContent>
            <TextContainer>
                <Text>{test_type}</Text>
                <Text>From: {seeker_name}</Text>
                <ValidText>Valid until: <ValidDate active={is_expired}>{expiry_date}</ValidDate></ValidText>
            </TextContainer>
            <TestCardBottomContainer active={is_bought}>
                {is_bought ? is_expired ? <ExpiredText>Expired</ExpiredText> : <RedeemButton onClick={handleBuy}>Re-send Code</RedeemButton> : <><SmallBlueButton onClick={handleBuy}>Buy</SmallBlueButton><PointContainer>{points_cost} Points</PointContainer></>}
            </TestCardBottomContainer>
        </TestCardContent>
      </TestCard>
  );
};


export default GenericDonorTestCard;

