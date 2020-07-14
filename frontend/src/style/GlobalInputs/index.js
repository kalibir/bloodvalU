import styled from "styled-components";
import { rem } from "polished";

export const BigInput = styled.input`
    background: #FFFFFF;
    border: 1px solid #A1A4B1;
    box-sizing: border-box;
    border-radius: 4px;
    width: ${rem("352px")};
    height: ${rem("48px")};
    outline: none;
    padding-left: ${rem("16px")};
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #232735;

    &:focus {
        outline: none;
  }
    ::placeholder{
        color: #8B90A0
  }
`;

export const SmallInput = styled(BigInput)`
    width: ${rem("160px")};
`;




