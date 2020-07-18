import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Template from "../components/Test";
import Credentials from "../components/Credentials";
import Navigation from "../components/Navigation";
import { LandingPage } from "../components/LandingPage";
import SeekerProfilePage from "../components/SeekerProfilePage";
import { SeekerEditProfile } from "../components/SeekerEditProfile";
import { DonorEditProfile } from "../components/DonorEditProfile";
import DonorDashboard from "../components/DonorDashboard";
import SeekerDashboard from "../components/SeekerRequestPage";
import CreateDonorProfile from "../components/Credentials/CreateSeekerProfile/";
import authComponent from '../HOCs/AuthComponent'

const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Navigation>
            <Route path="/test" component={DonorDashboard} />
            <Route path="/offer" component={DonorDashboard} />
            <Route path="/dashboard/donor" component={DonorDashboard} />
            <Route path="/dashboard/seeker" component={SeekerDashboard} />
            <Route path="/offered-tests" component={DonorDashboard} />
            <Route path="/templates" component={Template} />
            <Route exact path="/" component={authComponent(LandingPage)} />
            <Route path="/auth" component={Credentials} />
            {/* <Route path="/donorbartest" component={GenericDonorRequestBar} /> */}
            {/*<Route path="/auth" component={Credentials} />*/}
            <Route path="/editseeker" component={SeekerEditProfile} />
            <Route path="/editdonor" component={DonorEditProfile} />
            <Route path="/registertest" component={CreateDonorProfile} />
            <Route path="/seekerprofilepage" component={SeekerProfilePage} />
          </Navigation>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
