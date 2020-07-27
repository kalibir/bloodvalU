import React from "react";
import {rem} from "polished";
import styled from "styled-components";
import {SmallBlueButton, SmallGreenButton} from "../../style/GlobalButtons";
import {applyToRequestActionInAll} from "../../store/actions/bloodRequestActions";
import {useDispatch} from "react-redux";
import {buyTestAction} from "../../store/actions/offeredTestActions";
import {getLoggedInUserAction} from "../../store/actions/userActions";

const ColorDebug = false;  //at true all element get colored background for checking

const TestCard = styled.div`
    width: ${rem("330px")};
    height: ${rem("150px")};
    background: rgba(211,52,73, 0.05);
    border: 1px solid #D3D4D8;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 ${rem("12px")} ${rem("12px")} 0;
`;

const TestCardContent = styled.div`
    width: ${rem("210px")};
    height: ${rem("130px")};
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-start;
    padding-left: ${rem("10px")};
    background-color: ${ColorDebug ? "deepskyblue" : ""};
`;

const TextContainer = styled.div`
    width: 100%;
    height: ${rem("100px")};
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${ColorDebug ? "darkorange" : ""}; 
`;

const Text = styled.div`
    font-style: normal;
    font-weight: 300;
    font-size: ${rem("14px")};
    line-height: ${rem("18px")};
    color: #121232;
`;

const TestText = styled(Text)`
    font-weight: bold;
    line-height: ${rem("24px")};
`;

const ValidText = styled.div`
    color: #121232;
    font-weight: 400;
    font-size: ${rem("12px")};
    margin-top: ${rem("12px")};
`;

const ValidDate = styled.span`
    color: ${(props) => (props.active ? "#c60f24" : "#43A047")};
    font-weight: 500;
    font-size: ${rem("12px")};
    margin-left: ${rem("8px")};
`;

const TestCardBottomContainer = styled.div`
    width: 100%;
    height: ${rem("30px")};
    display: flex;
    align-items: flex-end;
    justify-content: ${(props) => (props.active ? "center" : "space-around")};
    background-color: ${ColorDebug ? "burlywood" : ""};
`;

export const PointContainer = styled.div`
    width: ${rem("72px")}; //set width only for standardized looking
    height: ${rem("20px")};
    font-weight: 500;
    font-size: ${rem("9px")};
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;  
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
const DownloadLink = styled.a`
  text-decoration: none;
`

const DownloadButton = styled(RedeemButton)`
      background-color: #c60f24;
      border: none;
`
const BuyButton = styled(SmallBlueButton)`
      width: ${rem("56px")};
      height: ${rem("28px")};
      background: #000080;
      border: 1px solid #000080;
      :hover {
        color: #000080;
        background: #fff;
        border: 1px solid #000080;
      }
      :active {
        color: #000080;
        background: #fff;
        border: 1px solid #000080;
  }
`

const GenericDonorTestCard = (props) => {
    const {test: {id, test_type, seeker, seeker_name, is_bought, points_cost, expiry_date, is_expired, results},} = props;
    let seeker_logo = seeker.logo

    const LogoContainer = styled.div`
      overflow: hidden;
      background-image: url(${seeker_logo});
      width: ${rem("110px")};
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      text-align: center;
      border-radius: 4px;
`;

    const dispatch = useDispatch();

    const handleBuy = async e => {
        const response = await dispatch(buyTestAction(id))
        if (response.status < 300) dispatch(getLoggedInUserAction())
    }


    return (
        <TestCard>
            <LogoContainer>
                {/*<img src={seeker_logo}/>*/}
            </LogoContainer>
            <TestCardContent>
                <TextContainer>
                    <TestText>{test_type}</TestText>
                    <Text>{seeker_name}</Text>
                    <ValidText>Valid until: <ValidDate active={is_expired}>{expiry_date}</ValidDate></ValidText>
                </TextContainer>

                <TestCardBottomContainer active={is_bought}>
                    {results ?
                        <DownloadLink href={results} target={"_blank"}
                                      download><DownloadButton>DOWNLOAD</DownloadButton></DownloadLink>
                        : is_bought ? is_expired ? <ExpiredText>Expired</ExpiredText> :
                            <RedeemButton onClick={handleBuy}>Re-send Code</RedeemButton> :
                            <>
                                <BuyButton onClick={handleBuy}>Buy</BuyButton>
                                <PointContainer>{points_cost} Points</PointContainer>
                            </>
                    }
                </TestCardBottomContainer>
            </TestCardContent>
        </TestCard>
    );
};


export default GenericDonorTestCard;

