import { rem } from "polished";
import styled from "styled-components";

export const BaseButton = styled.button`
  border-radius: ${rem("30px")};
  border: none;
  width: ${rem("120px")};
  height: ${rem("40px")};
  background: #e47d31;
  cursor: pointer;
  color: white;
  font-style: normal;
  font-weight: normal;
  line-height: ${rem("18px")};
  text-align: center;
  color: #ffffff;

  :hover {
    background-color: #cd702c;
  }
  :active {
    background-color: #cd702c;
  }

  /* for nested <Link> tabs of react-router-dom */
  a {
    font-size: inherit;
    color: inherit;
    text-decoration: none;
    height: 100%;
    width: 100%;
    /* background-color: red; */
    display: block;
    line-height: ${rem("30px")}; /* needs to be the same as height of button */
  }
`;

export const Button = styled(BaseButton)`
  width: ${rem("120px")};
  height: ${rem("40px")};
  letter-spacing: ${rem("1px")};
  font-size: ${rem("16px")};
  text-transform: uppercase;
`;

export const BigButton = styled(BaseButton)`
  width: ${rem("200px")};
  height: ${rem("58px")};
  font-size: ${rem("20px")};
`;

export const SmallButton = styled(BaseButton)`
  min-width: ${rem("120px")};
  height: ${rem("30px")};
  font-size: ${rem("16px")};
  text-transform: uppercase;
`;

export const SplitButton = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  a {
    margin: 0 !important;
  }
`;

export const LikeButton = styled(BaseButton)`
  width: ${rem("125px")};
  height: ${rem("33px")};
  font-size: ${rem("16px")};
  font-weight: 300;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: ${rem("1px")};
  background: rgba(145, 145, 145, 0.6);
  :hover {
    background-color: #8a8a8a;
  }
  :active {
    background-color: #8a8a8a;
  }
  svg {
    margin-right: 6px;
  }
`;

export const CommentButton = styled(BaseButton)`
  width: ${rem("125px")};
  height: ${rem("33px")};
  font-size: ${rem("16px")};
  font-weight: 300;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background: rgba(145, 145, 145, 0.6);
  :hover {
    background-color: #8a8a8a;
  }
  :active {
    background-color: #8a8a8a;
  }
`;
