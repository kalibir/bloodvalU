import {createGlobalStyle} from "styled-components";
import {rem} from "polished";

export const GlobalStyle = createGlobalStyle`

    * {
    margin: 0;
    padding: 0;
    font-size: ${rem("16px")};
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    }
    button:focus {
    outline: 0;
    }
    body {
        background-color: #FFF;
    }
    
::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar
{
  width: 12px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #555;
}

`;

export const theme = {};

