import { rem } from "polished";
import styled from "styled-components";

export const DarkBlueButton = styled.button`
    background: #121232;
    border-radius: 4px;
    border: 1px solid #121232;
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
    transition-timing-function: ease-in-out;

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
    transition-timing-function: ease-in-out;
   
    :hover {
        color: #FFF;
        background: #121232;
        //border: 1px solid #FFF;
    }
    :active {
        color: #FFF;
        background: #121232;
        //border: 1px solid #FFF;
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
    font-size: ${rem("18px")};
    line-height: 24px;
    color: #121232;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
  
    :hover {
        color: #FFF;
        border: 2px solid #121232;
        background: #121232;
    }
    :active {
        color: #FFF;
        border: 2px solid #121232;
        background: #121232;
        }
`;

export const SmallBlueButton = styled.button`
    width: ${rem("48px")};
    height: ${rem("20px")};
    background: #2196F3;
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 24px;
    letter-spacing: 0.16px;
    color: #FFFFFF;
    text-transform: uppercase;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
    outline: none;
    border: 1px solid #2196F3;
    display: flex;
    align-items: center;
    justify-content: center;
    
    :hover {
        color: #2196F3;
        background: #FFF;
        border: 1px solid #2196F3;
    }
    :active {
        color: #2196F3;
        background: #FFF;
        border: 1px solid #2196F3;
        }
`;

export const SmallGreenButton = styled.button`
    width: ${rem("48px")};
    height: ${rem("20px")};
    background: #43A047;
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 24px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
    outline: none;
    border: 1px solid #43A047;
    
    :hover {
        color: #43A047;
        background: #FFFFFF;
        border: 1px solid #43A047;
    }
    :active {
        color: #43A047;
        background: #FFFFFF;
        border: 1px solid #43A047;
        }
`;

export const SmallRedButton = styled.button`
    width: ${rem("48px")};
    height: ${rem("20px")};
    background: #D33449;;
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 24px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
    outline: none;
    border: 1px solid #D33449;
    
    :hover {
        color: #D33449;;
        background: #FFFFFF;
        border: 1px solid #D33449;
    }
    :active {
        color: #D33449;;
        background: #FFFFFF;
        border: 1px solid #D33449;
        }
`;

export const BaseStatusButton = styled.button`
  border: none;
  width: 82px;
  height: 28px;
  border-radius: 87px;
  background-color: #2196f3;
  font-size: 12px;
  cursor: pointer;
  color: white;
`;

export const CompleteButton = styled.button`
    width: ${rem("138px")};
    height: ${rem("32px")};
    background: #43A047;
    border-radius: 70px;
    font-weight: bold;
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    border: 1px solid #43A047;
    justify-content: center;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
    outline: none;
    
    :hover {
        color: #43A047;
        background: #FFFFFF;
        border: 1px solid #43A047;
    }
    :active {
        color: #FFFFFF;
        background: #43A047;
        border: 1px solid #43A047;
        }
`