import { rem } from "polished";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-bottom: 40px;
`;

export const StarContainerFix = styled.div`
  margin-top: 13px;
  display: flex;
  p {
    color: white;
    margin-left: 30px;
  }
`;

export const StarContainer = styled.div`
  .star {
    height: 34px;
    width: 40px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  grid-row-gap: ${rem("10px")};
  align-items: center;
`;

export const BaseCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  width: ${rem("270px")};
  // height: ${rem("410px")};
  border: 1px solid #ebebeb;
  border-radius: 3px;
  border-top: 8px solid #e47d31;
`;

export const UserCard = styled(BaseCard)`
  height: ${rem("192px")};
`;

export const UserCardProfile = styled.div`
  height: ${rem("70px")};
  display: flex;
  border-bottom: 1px solid #ebebeb;
  overflow: hidden;

  img {
    width: ${rem("70px")};
    height: ${rem("70px")};
  }
  div {
    padding: ${rem("10px")} 0 0 ${rem("10px")};
  }
  h1 {
    color: #e47d31;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
  }
  p {
    color: #4c4c4c;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    padding-top: 5px;
  }
  a {
    text-decoration: none;
    color: #e47d31;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
  }
`;

export const ReviewCardText = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: ${rem("340px")};
  padding: ${rem("14px")} ${rem("11px")} ${rem("22px")} ${rem("11px")};
  h1 {
    color: #e47d31;
    font-weight: bold;
    font-size: ${rem("20px")};
    line-height: ${rem("23px")};
    text-decoration: none;
  }
  h2 {
    font-style: normal;
    font-weight: 300;
    font-size: ${rem("20px")};
    line-height: ${rem("23px")};
    margin-bottom: ${rem("6px")};
    text-decoration: none;
  }
  h3 {
    font-weight: bold;
    font-size: ${rem("14px")};
    line-height: ${rem("16px")};
    color: #e47d31;
    margin-top: ${rem("12px")};
    text-decoration: none;
  }
  p:first-child {
    display: inline;
    font-weight: bold;
    font-size: ${rem("14px")};
    line-height: ${rem("16px")};
    color: #4c4c4c;
    padding-top: 5px;
  }

  p:nth-child(2) {
    font-weight: bold;
    font-size: ${rem("14px")};
    line-height: ${rem("16px")};
    color: #4c4c4c;
    padding-top: 5px;
  }
  a {
    text-decoration: none;
    color: #e47d31;
    font-weight: bold;
    cursor: pointer;
    :hover {
      color: #cb641a;
    }
  }
  > div:first-child,
  div:last-child {
    height: 120px;
  }
`;

export const WideReviewCard = styled(BaseCard)`
  border-top: none;
  width: ${rem("650px")};
  /* height: 200px; */
  margin-bottom: ${rem("20px")};
`;

export const WideUserCardProfile = styled.div`
  height: ${rem("70px")};
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebebeb;
  overflow: hidden;

  img {
    width: ${rem("70px")};
    height: ${rem("70px")};
  }
  div:nth-child(1) {
    display: flex;
  }
  div:nth-child(2) {
    padding: ${rem("10px")} 0 0 ${rem("10px")};
  }
  > div:nth-child(2) {
    margin-right: 10px;
    p {
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
    }
  }
  div:nth-child(3) {
    display: flex;
    margin-left: 20px;
  }
  div:nth-child(4) {
    justify-content: flex-end;
    margin-right: 10px;
  }
  h1 {
    color: #e47d31;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
  }
  p {
    color: #4c4c4c;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    padding-top: 5px;
  }
`;

export const StarRatingWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const WideReviewCardText = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: ${rem("118px")};
  padding: ${rem("10px")} ${rem("10px")} ${rem("22px")} ${rem("10px")};
  p {
    display: inline;
    font-size: ${rem("16px")};
    line-height: ${rem("16px")};
    color: #4c4c4c;
    padding-bottom: 10px;
  }
  a {
    font-size: 16px;
    line-height: 18px;
    text-align: right;

    color: #e47d31;
    cursor: pointer;
    :hover {
      color: #cb641a;
    }
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const PostComment = styled.div`
  display: flex;
`;
