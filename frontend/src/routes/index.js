import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Template from "../components/Test";
import Credentials from "../components/Credentials";
import Navigation from "../components/Navigation";
import { LandingPage } from "../components/LandingPage";
import SeekerProfilePage from "../components/SeekerProfilePage";

import DonorDashboard from "../components/DonorDashboard";
import SeekerDashboard from "../components/SeekerRequestPage";
import CreateDonorProfile from "../components/Credentials/CreateSeekerProfile/";
import authComponent from '../HOCs/AuthComponent'
import DonorEditProfile from "../components/DonorEditProfile";
import SeekerEditProfile from "../components/SeekerEditProfile";
import GeoMap from "../components/GeoMap";
import SeekerScanCode from "../components/SeekerScanCode";

const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Navigation>
            <Route path="/dashboard/donor" component={authComponent(DonorDashboard)} />
            <Route path="/dashboard/seeker" component={authComponent(SeekerDashboard)} />
            <Route path="/templates" component={Template} />
            <Route exact path="/" component={authComponent(LandingPage)} />
            <Route path="/auth" component={Credentials} />
            <Route path="/editseeker" component={authComponent(SeekerEditProfile)} />
            <Route path="/editdonor" component={authComponent(DonorEditProfile)} />
            <Route path="/seekerprofilepage" component={authComponent(SeekerProfilePage)} />
            <Route path="/map" component={GeoMap} />
            <Route path="/scan" component={SeekerScanCode} />
          </Navigation>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
