import React from "react";
import styled from "styled-components";
import {rem} from "polished";
import {NavLink} from "react-router-dom";

const activeClassName = "nav-item-active";
const StyledNavLink = styled(NavLink).attrs({activeClassName})`
  &.${activeClassName} {
    margin-top: 1px;
    h2 {
      font-weight: bold;
    }
    &:after {
      content: "";
      position: relative;
      bottom: ${rem("-23px")};
      width: ${rem("45px")};
      border-bottom: 3px solid #e47d31;
    }
  }
  text-decoration: none;
  width: ${rem("85px")};
  height: 100%;
  padding: 0 ${rem("3px")} 0 ${rem("3px")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  :hover {
    margin-top: 1px;
  }

  :hover:after {
    content: "";
    position: relative;
    bottom: ${rem("-23px")};
    width: ${rem("45px")};
    border-bottom: 3px solid #e47d31;
  }
`;

const LinksDiv = styled.div`
  display: flex;
`

const WrapperDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

export const SeekerNavigation = () => {


    return (
        <WrapperDiv>
            Welcome.
            <LinksDiv>
                <StyledNavLink to={"/dashboard/seeker"}>Dashboard</StyledNavLink>
                <StyledNavLink to={"/seekerprofilepage"}>Profile</StyledNavLink>
            </LinksDiv>
        </WrapperDiv>
    )
}

export const DonorNavigation = ({first_name, email}) => {
    return (
        <WrapperDiv>
            {first_name === "" ? `Welcome, ${email}` : `Welcome, ${first_name}`}
            <LinksDiv>
                <StyledNavLink to={"/dashboard/donor"}>Dashboard</StyledNavLink>
                <StyledNavLink to={"/map"}>Map</StyledNavLink>
            </LinksDiv>
        </WrapperDiv>
    )
}
