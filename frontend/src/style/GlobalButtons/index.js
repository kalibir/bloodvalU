import { rem } from "polished";
import styled from "styled-components";

export const RedRoundButton = styled.button`
  border-radius: ${rem("50px")};
  border: none;
  width: ${rem("218px")};
  height: ${rem("74px")};
  background: #E57373;
  cursor: pointer;
  font-size: ${rem("36px")};
  font-style: normal;
  font-weight: normal;
  line-height: ${rem("42px")};
  text-align: center;
  color: #ffffff;

  :hover {
    background-color: #e35d5d;
  }
  :active {
    background-color: #e35d5d;
`;

export const GreenRoundButton = styled.button`
  background: #9CCC65;
  border-radius: ${rem("50px")};
  border: none;
  width: ${rem("218px")};
  height: ${rem("74px")};
  cursor: pointer;
  font-size: ${rem("36px")};
  font-style: normal;
  font-weight: normal;
  line-height: ${rem("42px")};
  text-align: center;
  color: #ffffff;
  
  :hover {
    background: #91cc4e;
  }
  :active {
    background: #91cc4e;
`;

export const RedSquareButton = styled.button`
  width: ${rem("204px")};
  height: ${rem("204px")};
  background: #E57373;
  border-radius: 5px;
  border: none;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem("48px")};
  line-height: ${rem("56px")};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: ${rem("35px")};

color: #FFFFFF;
  
  :hover {
    background-color: #e35d5d;
  }
  :active {
    background-color: #e35d5d;
`;