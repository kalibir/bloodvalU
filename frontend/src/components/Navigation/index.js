import React, { useState, useEffect } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import {connect, useDispatch} from "react-redux";
import { rem } from "polished";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LunaLogoSvg from "../../assets/icons/logo.svg";
import { Icon } from "../../style/GlobalIcons";
import { Title } from "../../style/GlobalTitles";

import { SplitButton, BaseButton } from "../../style/GlobalButtons";
import {userLogout} from "../../store/actions/logoutActions";
import {validate} from "../../store/actions/registrationActions";
import {
  getCommentsByUserIDAction,
  getRestaurantsByUserIDAction, getReviewsByUserIDAction,
  getUserByIDAction
} from "../../store/actions/userProfileActions";
import {useHistory} from "react-router";

const Wrapper = styled.div`
  padding-top: 70px; /* Needs to be exactly the same height as the Header, offsets content because it's fixed */
  padding-bottom: 90px; /* Needs to be exactly the same height as the Footer, offsets content because it's fixed */
`;

/* -----------HEADER------------------ */
const Header = styled.div`
  border-bottom: solid 1px rgba(221, 221, 221, 0.67);
  width: 100%;
  height: 70px;
  display: flex;
  padding: 0 ${rem("30px")} 0 ${rem("30px")};
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: white;
  justify-content: space-between;
`;

const NavSectionLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 20%;
  cursor: pointer;
`;

const NavSectionRight = styled.div`
  min-width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  a {
    text-decoration: none;
    margin-right: 2rem;
    height: 100%;
    color: #4a4a4a;
    font-style: normal;
    font-weight: normal;
    font-size: ${rem("20px")};
  }
`;

const IconContainer = styled.div`
  cursor: pointer;
  width: ${rem("40px")};
  height: ${rem("40px")};
  display: flex;
  justify-content: center;
`;

const LunaLogo = styled(Icon)`
  width: ${rem("124px")};
  height: ${rem("45px")};
  margin-right: 5%;
`;

const TabTitles = styled(Title)`
  font-size: ${rem("17px")};
  font-weight: 400;
`;

const NavTabWrapper = styled.div`
  /* width: ${rem("85px")};
  height: 100%;
  padding: 0 ${rem("3px")} 0 ${rem("3px")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  margin-right: 7%;
  :hover {
    margin-top: 1px;
  }

  :hover:after {
    content: "";
    position: relative;
    bottom: ${rem("-23px")};
    width: ${rem("45px")};
    border-bottom: 3px solid #e47d31;
  } */
`;

const SignupButton = styled(BaseButton)`
  width: ${rem("100px")};
  height: ${rem("40px")};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: ${rem("1px")};
  text-transform: uppercase;
`;

const LoginButton = styled(BaseButton)`
  width: ${rem("100px")};
  height: ${rem("40px")};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  text-transform: uppercase;
`;

const LogOutButton = styled(BaseButton)`
  text-transform: uppercase;
`;

/* -----------FOOTER------------------ */
const Footer = styled.div`
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background-color: white;
  justify-content: space-between;
  flex-direction: column;
`;

const TopFooter = styled.div`
  border-bottom: solid 1px rgba(221, 221, 221, 0.67);
  width: 100%;
  height: 55px;
  display: flex;
  padding: 0 ${rem("30px")} 0 ${rem("30px")};
  background-color: white;
  justify-content: space-between;
`;

const FooterSectionLeft = styled.div`
  display: flex;
  min-width: 40%;

  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  a {
    text-decoration: none;
    margin-right: 2rem;
    height: 100%;
    color: #4a4a4a;
    font-style: normal;
    font-weight: normal;
    font-size: ${rem("20px")};
  }
`;

const FooterSectionRight = styled.div`
  min-width: 20%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const BottomFooter = styled.div`
  border-bottom: solid 1px rgba(221, 221, 221, 0.67);
  width: 100%;
  height: 35px;
  display: flex;
  padding: 0 ${rem("30px")} 0 ${rem("30px")};
  background-color: white;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 14px;
    color: #646363;
  }
`;

const SocialsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  grid-column-gap: ${rem("20px")};
  align-items: center;
`;

const SocialButton = styled.button`
  height: ${rem("40px")};
  width: ${rem("40px")};
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid #979797;
  color: #979797;
  background-color: #ffffff;

  &:focus {
    outline: none;
  }
  :hover {
    background-color: #e6e6e6;
  }
  :active {
    background-color: #e6e6e6;
  }
`;

const FooterLink = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 7%;
  width: max-content;
`;

const FooterLinkTitle = styled(Title)`
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("18px")};
  text-decoration: none;
`;

const activeClassName = "nav-item-active";

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
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

const Navigation = ({ children, authReducer:{authenticated}}) => {

  const {push} = useHistory();
  const dispatch = useDispatch()

  const handeLogout = () => {
    dispatch(userLogout());
    push("/");
  };

  return (
    <div>
      <Wrapper>
        <Header>
          <NavSectionLeft to="/feed">
            <Link to="/">
                <LunaLogo src={LunaLogoSvg} />
              </Link>
          </NavSectionLeft>
          <NavSectionRight>
            <StyledNavLink exact to="/">
              <TabTitles>Home</TabTitles>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <TabTitles>Search</TabTitles>
            </StyledNavLink>
            {authenticated ? <StyledNavLink to="/profile">
              <TabTitles>Profile</TabTitles>
            </StyledNavLink> : null}
            {authenticated ? <LogOutButton onClick={handeLogout}>Logout</LogOutButton> : <SplitButton>
              <Link to="/auth/signup">
                <SignupButton>Signup </SignupButton>
              </Link>
              <Link to="/auth/login">
                <LoginButton>Login</LoginButton>{" "}
              </Link>
            </SplitButton>}
          </NavSectionRight>
        </Header>
        {children}
        <Footer>
          <TopFooter>
            <FooterSectionLeft to="/feed">
              <Link to="/about">
                <FooterLink>
                  <FooterLinkTitle>About Us</FooterLinkTitle>
                </FooterLink>
              </Link>
              <Link to="/press">
                <FooterLink>
                  <FooterLinkTitle>Press</FooterLinkTitle>
                </FooterLink>
              </Link>
              <Link to="/blog">
                <FooterLink>
                  <FooterLinkTitle>Blog</FooterLinkTitle>
                </FooterLink>
              </Link>
              <Link to="/ios">
                <FooterLink>
                  <FooterLinkTitle>IOS</FooterLinkTitle>
                </FooterLink>
              </Link>
              <Link to="/android">
                <FooterLink>
                  <FooterLinkTitle>Android</FooterLinkTitle>
                </FooterLink>
              </Link>
            </FooterSectionLeft>
            <FooterSectionRight>
              <SocialsContainer>
                <SocialButton>
                  <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                </SocialButton>
                <SocialButton>
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                </SocialButton>
                <SocialButton>
                  <FontAwesomeIcon icon={["fab", "google-plus-g"]} />
                </SocialButton>
                <SocialButton>
                  <FontAwesomeIcon icon={["fab", "instagram"]} />
                </SocialButton>
              </SocialsContainer>
            </FooterSectionRight>
          </TopFooter>
          <BottomFooter>
            <p>© Copyright Luna 2020</p>
          </BottomFooter>
        </Footer>
      </Wrapper>
    </div>
  );
};


const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
    }
};

export default connect(mapStateToProps)(Navigation);