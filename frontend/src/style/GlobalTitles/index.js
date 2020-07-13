import styled from "styled-components";
import { rem } from "polished";

export const Title = styled.h2`
  font-family: Helvetica;
  font-size: ${rem("40px")};
  font-weight: 300;
`;

export const MainTitle = styled.h1`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem("24px")};
  line-height: ${rem("28px")};

  /* identical to box height */
  text-align: center;
  text-transform: uppercase;

  color: #4c4c4c;
`;

export const BigTitleHr = styled.hr`
  border: 3px solid #e47d31;
  width: ${rem("260px")};
`;

export const TitleHr = styled.hr`
  border: 3px solid #e47d31;
  width: ${rem("200px")};
`;

export const SmallTitleHr = styled.hr`
  border: 3px solid #e47d31;
  width: ${rem("100px")};
`;
