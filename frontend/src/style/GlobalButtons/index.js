import { rem } from "polished";
import styled from "styled-components";

export const DarkBlueButton = styled.button`
    background: #121232;
    border-radius: 4px;
    border: none;
    outline: none;
    width: ${rem("141px")};
    height: ${rem("48px")};
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #FFFFFF;
    transition-duration: 0.4s;

    :hover {
        color: #121232;
        background: #FFF;
        border: 1px solid #121232;
    }
    :active {
        color: #121232;
        background: #FFF;
        border: 1px solid #121232;
    }
`;

export const WhiteButton = styled.button`
    background: #FFFFFF;
    border: 1px solid #121232;
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
    width: ${rem("106px")};
    height: ${rem("48px")};
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: #121232;
    transition-duration: 0.4s;
   
    :hover {
        color: #FFF;
        background: #121232;
        border: 1px solid #FFF;
    }
    :active {
        color: #FFF;
        background: #121232;
        border: 1px solid #FFF;
    }
`

export const ChooseRoleButton = styled.button`
    width: ${rem("352px")};
    height: ${rem("160px")};
    background: #FFFFFF;
    border: 1px solid #D3D4D8;
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #121232;
    transition-duration: 0.4s;
  
    :hover {
        color: #FFF;
        border: 2px solid #121232;
        background: #121232;
    }
    :active {
        color: #FFF;
        border: 2px solid #121232;
        background: #121232;
`;