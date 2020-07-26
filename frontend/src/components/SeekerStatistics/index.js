import React, {useEffect} from "react";
import {PageContainer} from "../../style/GlobalWrappers";
import {connect} from "react-redux";
import {getMyStatisticsAction} from "../../store/actions/bloodRequestActions";


const SeekerStatistics = ({userProfileReducer: {statistics}, dispatch}) => {

    useEffect(() => {
        dispatch(getMyStatisticsAction())
    },[dispatch])


    return (
        <PageContainer>STATS</PageContainer>
    )
}

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        userProfileReducer: state.userProfileReducer,
    };
};

export default connect(mapStateToProps)(SeekerStatistics);
