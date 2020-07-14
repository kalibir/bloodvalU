import styled from "styled-components";
import { rem } from "polished";

export const BlackTitle = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 56px;
  color: #000000;
`;

export const RedTitle = styled(BlackTitle)`
  color: #E57373;
  font-weight: bold;
`;
