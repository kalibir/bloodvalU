import React, {useEffect} from "react";
import {PageContainer} from "../../style/GlobalWrappers";
import {connect} from "react-redux";
import {getMyStatisticsAction} from "../../store/actions/bloodRequestActions";
import GenderGraph from "./GenderGraph";
import BloodGroupGraph from "./BloodGroupGraph";
import styled from "styled-components";
import AgeGraph from "./AgeGraph";


// setInterval(() => {
//     setState(getState());
// }, 2000)

const StatsContent = styled.div`
  display: flex;
  justify-content: center;
`


const SeekerStatistics = ({userProfileReducer: {statistics}, dispatch}) => {

    useEffect(() => {
        dispatch(getMyStatisticsAction())
    }, [dispatch])


    return (
        <PageContainer>
            <StatsContent>
                <AgeGraph statistics={statistics}/>
                <GenderGraph statistics={statistics}/>
                <BloodGroupGraph statistics={statistics}/>
            </StatsContent>
        </PageContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        userProfileReducer: state.userProfileReducer,
    };
};

export default connect(mapStateToProps)(SeekerStatistics);
