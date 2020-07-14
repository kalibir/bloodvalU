import React from "react";
import styled from "styled-components";
import { rem } from "polished";

const Wrapper = styled.div`
  padding-top: 82px; /* Needs to be exactly the same height as the Header, offsets content because it's fixed */
  padding-bottom: 82px; /* Needs to be exactly the same height as the Footer, offsets content because it's fixed */
`;

/* -----------HEADER------------------ */
const Header = styled.div`
  width: 100%;
  height: 82px;
  left: 0;
  top: 0;
  background: #E57373;
  padding: 0 ${rem("30px")} 0 ${rem("30px")};
  position: fixed;
  z-index: 1000;
  justify-content: space-between;
`;

/* -----------FOOTER------------------ */
const Footer = styled.div`
  width: 100%;
  height: 82px;
  left: 0;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background: #E57373;
  border: 1px solid #E57373;
  box-sizing: border-box;
  justify-content: space-between;
  flex-direction: column;
`;


const Navigation = ({ children}) => {

  return (
    <div>
      <Wrapper>
        <Header>
        </Header>
        {children}
        <Footer>
        </Footer>
      </Wrapper>
    </div>
  );
};


export default Navigation;