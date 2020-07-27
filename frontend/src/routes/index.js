import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Template from "../components/Test";
import Credentials from "../components/Credentials";
import Navigation from "../components/Navigation";
import LandingPage from "../components/LandingPage";
import SeekerProfilePage from "../components/SeekerProfilePage";

import DonorDashboard from "../components/DonorDashboard";
import SeekerDashboard from "../components/SeekerRequestPage";
import authComponentDonor from "../HOCs/AuthComponentDonor";
import authComponentSeeker from "../HOCs/AuthComponentSeeker";
import DonorEditProfile from "../components/DonorEditProfile";
import SeekerEditProfile from "../components/SeekerEditProfile";
import GeoMap from "../components/GeoMap";
import AdminPage from "../components/AdminPage";
import SeekerScanCode from "../components/SeekerScanCode";
import SeekerStatistics from "../components/SeekerStatistics";

const Routes = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Navigation>
                        <Route exact path="/" component={LandingPage}/>

                        <Route path="/scan" component={authComponentSeeker(SeekerScanCode)}/>
                        <Route path="/editseeker" component={authComponentSeeker(SeekerEditProfile)}/>
                        <Route path="/statistics" component={authComponentSeeker(SeekerStatistics)}/>
                        <Route path="/dashboard/seeker" component={authComponentSeeker(SeekerDashboard)}/>
                        <Route path="/seekerprofilepage" component={authComponentSeeker(SeekerProfilePage)}/>

                        <Route path="/map" component={authComponentDonor(GeoMap)}/>
                        <Route path="/editdonor" component={authComponentDonor(DonorEditProfile)}/>
                        <Route path="/dashboard/donor" component={authComponentDonor(DonorDashboard)}/>

                        <Route path="/admin" component={AdminPage}/>
                        <Route path="/templates" component={Template}/>
                        <Route path="/auth" component={Credentials}/>
                    </Navigation>
                </Switch>
            </Router>
        </>
    );
};

export default Routes;
