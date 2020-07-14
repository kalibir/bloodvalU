import styled from "styled-components";
import { rem } from "polished";

export const BaseInput = styled.input`
  font-weight: normal;
  font-size: ${rem("36px")};
  line-height: ${rem("42px")};
  background: none;
  color: #3b3939;
  border-bottom: 1px solid #E57373;
  border-style: none none solid none;
  padding: ${rem("18px")};
  width: ${rem("375px")};

  &:focus {
    outline: none;
  }
  
  ::placeholder {
   color: #E5E5E5;
   font-style: italic;
  }
`;

export const BigInput = styled(BaseInput)`
  width: ${rem("471px")};
`

