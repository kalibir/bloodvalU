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
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.5px;
    color: #FFFFFF;

  :hover {
    border: 1px solid #E5E5E5;;
  }
  :active {
    background-color: #e35d5d;
`;

export const ChooseRoleButton = styled.button`
  width: ${rem("352px")};
  height: ${rem("160px")};
  background: #FFFFFF;
  border: 1px solid #D3D4D8;
  box-sizing: border-box;
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #121232;
  
  :hover {
    border: 2px solid #E5E5E5;
    background: #fcfcfc;
  }
  :active {
    border: 2px solid #E5E5E5;
    background: #fcfcfc;
`;