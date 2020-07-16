import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Template from "../components/Test";
import Credentials from "../components/Credentials";
import Navigation from "../components/Navigation";
import { LandingPage } from "../components/LandingPage";
import CreateTestModal from "../components/CreateTestModal";
import { DonorDashboard } from "../components/DonorDashboard";
import SeekerDashboard from "../components/SeekerRequestPage"

const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Navigation>
            <Route path="/test" component={DonorDashboard} />
            <Route path="/offer" component={DonorDashboard} />
            <Route path="/templates" component={Template} />
            <Route path="/home" component={LandingPage} />
            <Route path="/auth" component={Credentials} />
            {/* <Route path="/donorbartest" component={GenericDonorRequestBar} /> */}
            <Route path="/modal" component={CreateTestModal} />
            <Route exact path="/requests/handle" component={SeekerDashboard } />
          </Navigation>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
