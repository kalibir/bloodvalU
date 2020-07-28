import React, {useEffect} from "react";
import {PageContainer} from "../../style/GlobalWrappers";
import {connect} from "react-redux";
import {getMyStatisticsAction} from "../../store/actions/bloodRequestActions";
import GenderGraph from "./GenderGraph";
import BloodGroupGraph from "./BloodGroupGraph";
import styled from "styled-components";
import AgeGraph from "./AgeGraph";
import rem from "polished/lib/helpers/rem";
import TotalGraph from "./TotalGraph";
import {getLoggedInUserAction} from "../../store/actions/userActions";


// setInterval(() => {
//     setState(getState());
// }, 2000)

const StatsContent = styled.div`
  display: grid;
  height: 90%;
  grid-gap: ${rem("16px")};
  grid-template-areas: 
  "title title title"
  "gender blood total"
  "age age age";
`


const Title = styled.h2`
  font-size: ${rem("40px")};
  font-weight: lighter;
  grid-area: title;
`


const SeekerStatistics = ({userProfileReducer: {statistics}, dispatch, authReducer: {userObj}}) => {

    useEffect(() => {
        dispatch(getLoggedInUserAction())
        dispatch(getMyStatisticsAction())
    }, [dispatch])


    return (
        <PageContainer>
            <StatsContent>
                <Title>Analytics</Title>
                <AgeGraph statistics={statistics}/>
                <TotalGraph profile={userObj}/>
                <GenderGraph statistics={statistics}/>
                <BloodGroupGraph statistics={statistics}/>
            </StatsContent>
        </PageContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        userProfileReducer: state.userProfileReducer,
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(SeekerStatistics);
