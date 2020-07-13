import styled from "styled-components";
import { rem } from "polished";

export const BaseInput = styled.input`
  height: ${rem("50px")};
  font-family: Helvetica, sans-serif, sans-serif;
  color: #4c4c4c;
  font-size: ${rem("20px")};
  line-height: ${rem("20px")};
  padding: ${rem("18px")};
  border: 1px solid #ebebeb;
  border-radius: 3px;
  background: none;

  &:focus {
    outline: none;
  }
`;

export const SearchInput = styled(BaseInput)`
  width: ${rem("530px")};
  height: ${rem("55px")};
  font-size: ${rem("20px")};
`;

export const FilterListInput = styled(BaseInput)`
  width: ${rem("510px")};
  height: ${rem("40px")};
  font-size: ${rem("16px")};
`;

export const CommentInput = styled(BaseInput)`
  width: ${rem("414px")};
  height: ${rem("30px")};
  font-size: ${rem("14px")};
`;

export const InputTextArea = styled.textarea`
  width: ${rem("832px")};
  height: ${rem("264px")};
  font-family: Helvetica, sans-serif, sans-serif;
  color: #4c4c4c;
  font-size: ${rem("20px")};
  line-height: ${rem("20px")};
  padding: ${rem("18px")};
  border: 1px solid #ebebeb;
  border-radius: 3px;
  background: none;

  &:focus {
    outline: none;
  }
`;
