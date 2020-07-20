import React from "react";
import styled from "styled-components";
import {rem} from "polished";
import {useHistory} from "react-router";

export const SeekerNavigation = () => {

    const {push} = useHistory()

    const toDashBoard = () => {
        console.log("clicked");
        push("/dashboard/seeker")
    }

    const toProfile = () => {
        console.log("clicked");
        push("/seekerprofilepage")
    }

    return (
        <> <button disabled={window.location.pathname === "/dashboard/seeker"} onClick={toDashBoard}>Dashboard</button>
            Welcome.<br/>You are here: {window.location.pathname}
            <button disabled={window.location.pathname === "/seekerprofilepage"} onClick={toProfile}>Profile</button> </>
    )
}