import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes";
import { Provider } from "react-redux";
import { GlobalStyle, theme } from "./style";
import { ThemeProvider } from "styled-components";
import { store } from "./store";
import * as serviceWorker from './serviceWorker';
import {sendLogin, setLoggedInUser} from "./store/actions/loginActions";

if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token");
  store.dispatch(sendLogin(token));
}
if (localStorage.getItem("profile")) {
  const profile = localStorage.getItem("profile");
  store.dispatch(setLoggedInUser(JSON.parse(profile)));
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
