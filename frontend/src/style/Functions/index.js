import React, {useState} from "react";
import styled from "styled-components";
import {rem} from "polished";
import {NavLink} from "react-router-dom";

// const activeClassName = "nav-item-active";
const StyledNavLink = styled(NavLink)`
  color: ${(props) => (props.active ? "#d33449" : "#A1A4B1")};
  text-decoration: none;
  position: relative;
  text-decoration: none;
  width: ${rem("85px")};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  :visited {
    color: black;
  }
  :hover {
    color: black;
  }
  ::after {
    position: absolute;
    bottom: 0;
    content: "";
    display: block;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 3px;
    background: #d33449;
    transition: width 0.3s;
  }
  :focus:after {
    width: 100%;
    transition: width 0.3s;
  }
`;

const LinksDiv = styled.div`
  display: flex;
  height: 100%;
  position: relative;
`;

const WrapperDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const SeekerNavigation = (name) => {
    const [active, setActive] = useState("dashboard");
    const handleClick = (e) => {
        const value = e.target.id;
        setActive(value);
    };
    return (
        <WrapperDiv>
            Welcome!
            <LinksDiv>
                {name === "" ? <></> :
                    <>
                        <StyledNavLink
                            to={"/dashboard/seeker"}
                            onClick={handleClick}
                            active={active === "dashboard"}
                            id="dashboard">
                            Dashboard
                        </StyledNavLink>
                        <StyledNavLink
                            to={"/seekerprofilepage"}
                            onClick={handleClick}
                            active={active === "profile"}
                            id="profile">
                            Profile
                        </StyledNavLink>
                    </>
                }
            </LinksDiv>
        </WrapperDiv>
    );
};

export const DonorNavigation = ({first_name, email}) => {
    const [active, setActive] = useState("dashboard");
    const handleClick = (e) => {
        const value = e.target.id;
        setActive(value);
    };
    return (
        <WrapperDiv>
            {first_name === "" ? `Welcome, ${email}` : `Welcome, ${first_name}`}
            <LinksDiv>
                {first_name === "" ? <></>
                    : <>
                        <StyledNavLink
                            to={"/dashboard/donor"}
                            onClick={handleClick}
                            active={active === "dashboard"}
                            id="dashboard">
                            Dashboard
                        </StyledNavLink>
                        <StyledNavLink to={"/map"} onClick={handleClick} active={active === "map"} id="map">
                            Map
                        </StyledNavLink>
                    </>
                }
            </LinksDiv>
        </WrapperDiv>
    );
};
