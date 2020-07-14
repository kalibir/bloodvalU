import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import {WhiteButton} from "../../style/GlobalButtons";
import {BloodValU} from "../../style/GlobalTitles";

const Wrapper = styled.div`
  padding-top: 72px; /* Needs to be exactly the same height as the Header, offsets content because it's fixed */
  padding-bottom: 64px; /* Needs to be exactly the same height as the Footer, offsets content because it's fixed */
  background-color: #FAFAFC;
`;

/* -----------HEADER------------------ */
const Header = styled.div`
  width: 100%;
  height: 72px;
  left: 0;
  top: 0;
  background-color: #FFFFFF;
  //background: #E57373;
  padding: 0 ${rem("160px")} 0 ${rem("160px")};
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* -----------LOGO------------------ */
const Bloodval = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: ${rem("24px")};
  line-height: ${rem("24px")};
  color: #262541;
`

const U = styled(Bloodval)`
  font-size: ${rem("36px")};
  font-weight: 600;
  color: #D33449;
`

/* -----------BUTTONS------------------ */
const HeaderButtonUser = styled(WhiteButton)`
  font-family: Roboto;
  font-size: ${rem("14px")};
  line-height: ${rem("16px")};
  width:  ${rem("144px")};
  color: #3E465F;
  transition-duration: initial;  //to remove base button
    
  :hover, :active{
  color: #3E465F;
  background-color: #FFFFFF;
  border: 1px solid #121232;
  }  
`

const HeaderButtonLogin = styled(HeaderButtonUser)`  
  border: none;
  
  :hover, :active{
    border: none;
  }
`

// TODO delete them
let authenticated = false;
const clicked = () => {
    console.log("The button is clicked")
}

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

const Navigation = ({children}) => {

  return (
    <div>
      <Wrapper>
        <Header>
            <BloodValU text="bloodval" black={24} red={36} />
            {authenticated ? <HeaderButtonUser>Edina M.</HeaderButtonUser> : <HeaderButtonLogin onClick={clicked}>Login</HeaderButtonLogin>}
        </Header>
        {children}
        <Footer>
        </Footer>
      </Wrapper>
    </div>
  );
};

export default Navigation;