import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Template from "../components/Test";
import Credentials from "../components/Credentials";

const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          {/*<Navigation>*/}
            <Route path="/templates" component={Template} />
            <Route path="/auth" component={Credentials} />
            {/*<Route path="/auth" component={Credentials} />*/}
            {/*<Route path="/auth" component={Credentials} />*/}
          {/*</Navigation>*/}
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
