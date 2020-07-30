import React from "react";
import styled from "styled-components";
import {rem} from "polished";
import {NavLink} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import {connect} from "react-redux";

const activeClassName = "nav-item-active";
const StyledNavLink = styled(NavLink).attrs({activeClassName})`
  &.${activeClassName} {
     &:after {
     color: #d33449;
       width: 100%;
     }
  }
  color: #A1A4B1;
  text-decoration: none;
  position: relative;
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
    width: 0;
    height: 3px;
    background: #d33449;
    transition: width 0.3s;
  }
  :focus:after {
    width: 100%;
    transition: width 0.3s;
  }
`;

const InvalidMenuLink = styled.div`
  color: darkgrey;
  text-decoration: none;
  position: relative;
  width: ${rem("85px")};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
};

const WelcomeText = styled.p`
  @media ${device.laptop} {
    display: none;
  } 
`

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

const SeekerNavigation = ({authReducer: {userObj}}) => {
    document.title = "BloodvalU - Clinic"
    return (
        <WrapperDiv>
            {userObj ?  `${userObj.name}` : "Welcome!" }
            <LinksDiv>
                {userObj && userObj.name === "" ? <></> :
                    <>
                        <StyledNavLink to="/dashboard/seeker">
                            Dashboard
                        </StyledNavLink>
                        {userObj.is_valid ?
                            <>
                                <StyledNavLink to="/scan">
                                    Scan QR
                                </StyledNavLink>
                                <StyledNavLink to="/statistics">
                                    Analytics
                                </StyledNavLink>
                            </>
                            : <>
                                <Tooltip title="You have to be validated to use this function." arrow><InvalidMenuLink>Scan
                                    QR</InvalidMenuLink></Tooltip>
                                <Tooltip title="You have to be validated to use this function."
                                         arrow><InvalidMenuLink>Analytics</InvalidMenuLink></Tooltip>
                            </>
                        }
                        <StyledNavLink to="/seekerprofilepage">
                            Profile
                        </StyledNavLink>
                    </>
                }
            </LinksDiv>
        </WrapperDiv>
    );
};

export const DonorNavigation = ({first_name, email}) => {
    document.title = "BloodvalU - Donor"
    const shortEmail = email.split('@')[0];
    return (
        <WrapperDiv>
            <WelcomeText>{first_name === "" ? `Welcome, ${shortEmail}.` : `Welcome, ${first_name}.`}</WelcomeText>
            <LinksDiv>
                {first_name === "" ? <></>
                    : <>
                        <StyledNavLink
                            to="/dashboard/donor">
                            Dashboard
                        </StyledNavLink>
                        <StyledNavLink to="/map">
                            Map
                        </StyledNavLink>
                    </>
                }
            </LinksDiv>
        </WrapperDiv>
    );
};

export const AdminNavigation = () => {
    document.title = "BloodvalU - Admin"
    return (
        <WrapperDiv>
            <WelcomeText>ADMIN</WelcomeText>
            <LinksDiv>
            </LinksDiv>
        </WrapperDiv>
    );
};


const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(SeekerNavigation);