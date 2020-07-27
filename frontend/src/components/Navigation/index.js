import React, {useState} from "react";
import styled from "styled-components";
import {rem} from "polished";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import {connect} from "react-redux";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {WhiteButton} from "../../style/GlobalButtons";
import {BloodValU} from "../../style/GlobalTitles";
import {userLogout} from "../../store/actions/logoutActions";
import {SeekerNavigation, DonorNavigation, device, AdminNavigation} from "../../style/Functions";
import {setIsLogin} from "../../store/actions/userActions";

const Wrapper = styled.div`
  padding-top: 72px; /* Needs to be exactly the same height as the Header, offsets content because it's fixed */
  padding-bottom: 64px; /* Needs to be exactly the same height as the Footer, offsets content because it's fixed */
  background-color: #fafafc;
`;

/* -----------HEADER------------------ */
const Header = styled.div`
  width: 100%;
  height: 72px;
  left: 0;
  top: 0;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 0 ${rem("40px")} 0 ${rem("40px")};
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


/* -----------BUTTONS------------------ */
const HeaderButtonUser = styled(WhiteButton)`
  font-family: Roboto,serif;
  font-size: ${rem("14px")};
  line-height: ${rem("16px")};
  width: ${rem("144px")};
  color: #3e465f;
  transition-duration: initial; //to remove base button

  :hover,
  :active {
    color: #3e465f;
    background-color: #ffffff;
    border: 1px solid #121232;
  }
`;

const HeaderButtonLogin = styled(HeaderButtonUser)`
  border: none;

  :hover,
  :active {
    border: none;
  }
`;

const WelcomeText = styled.div`
  font-family: Roboto;
  font-size: ${rem("16px")};
  line-height: ${rem("16px")};
  height: 100%;
  color: #3e465f;
  display: flex;
  text-align: center;
  align-items: center;
`;

/* -----------FOOTER------------------ */
const Footer = styled.div`
  width: 100%;
  height: 64px;
  left: 0;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: #121232;
  //background: #E57373;
  //border: 1px solid #E57373;
  box-sizing: border-box;
  justify-content: space-between;
  flex-direction: column;
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;

const TopFooter = styled.div`
   @media ${device.tablet} {
    flex-direction: column;
    height: auto;
  }
  border-bottom: solid 1px rgba(221, 221, 221, 0.67);
  width: 100%;
  height: 42px;
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
  height: 21px;
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
  @media ${device.tablet} {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
  }
`;

const SocialButton = styled.button`
  height: ${rem("30px")};
  width: ${rem("30px")};
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

const FooterLinkTitle = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem("14px")};
  text-decoration: none;
`;

const Navigation = ({children, authReducer: {authenticated, userObj, isLogin}, dispatch}) => {
    const {push} = useHistory();
    const handleClickLogo = (e) => {
        dispatch(setIsLogin(true))
        push("/");
    };

    const handleLogout = () => {
        dispatch(userLogout());
        push("/");
    };

    const handClickLogin = () => {
        dispatch(setIsLogin(false))
        push("/auth/login");
    };

    const handClickSignUp = () => {
        dispatch(setIsLogin(true))
        push("/");
    };

    return (
        <div>
            <Wrapper>
                <Header>
                    <NavLink to={"/"}>
                        <BloodValU onClick={handleClickLogo} text="bloodval" black={24} red={36}/>
                    </NavLink>
                    {authenticated && userObj ?
                        userObj.is_staff ? <> <AdminNavigation/> <HeaderButtonUser
                                onClick={handleLogout}>Logout</HeaderButtonUser></> :
                            (userObj.is_donor ?
                                <><DonorNavigation email={userObj.email} first_name={userObj.first_name}/>
                                    <HeaderButtonUser onClick={handleLogout}>Logout</HeaderButtonUser></> :
                                <><SeekerNavigation name={userObj.name}/> <HeaderButtonUser
                                    onClick={handleLogout}>Logout</HeaderButtonUser></>) : null}
                    {!authenticated ? (isLogin ? <HeaderButtonUser onClick={handClickLogin}>Login</HeaderButtonUser> :
                        <HeaderButtonUser onClick={handClickSignUp}>Sign Up</HeaderButtonUser> ): null}

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
                                    <FontAwesomeIcon icon={["fab", "facebook-f"]}/>
                                </SocialButton>
                                <SocialButton>
                                    <FontAwesomeIcon icon={["fab", "twitter"]}/>
                                </SocialButton>
                                <SocialButton>
                                    <FontAwesomeIcon icon={["fab", "google-plus-g"]}/>
                                </SocialButton>
                                <SocialButton>
                                    <FontAwesomeIcon icon={["fab", "instagram"]}/>
                                </SocialButton>
                            </SocialsContainer>
                        </FooterSectionRight>
                    </TopFooter>
                    <BottomFooter>
                        <p>© Copyright BloodvalU 2020</p>
                    </BottomFooter>
                </Footer>
            </Wrapper>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(Navigation);
