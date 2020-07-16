import React from "react";
import styled from "styled-components";
import { rem } from "polished";

export const SmallTitle = styled.h4`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: ${rem("16px")};
    color: #232735;
`;

export const MiddleTitle = styled.h3`
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: ${rem("32px")};
    color: #232735;
`;

export const BigTitle = styled.h1`
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 48px;
    color: #232735;
    text-transform: uppercase;
`

export const BloodValU = ({text, black, red}) => {

    const Bloodval = styled.span`
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: ${rem(`${black}px`)};
      line-height: ${rem("24px")};
      color: #262541;
    `

    const U = styled(Bloodval)`
      font-size: ${rem(`${red}px`)};
      font-weight: 600;
      color: #D33449;
    `

    return (
        <div>
            <Bloodval>{text}</Bloodval><U>U</U>
        </div>
    )
}

export const ErrorPlaceholder = styled.div`
  // width: ${rem("340px")};
  // height: ${rem("52px")};
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: red;
    text-align: center;
  }
`;