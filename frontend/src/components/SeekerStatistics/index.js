import React, {useEffect} from "react";
import {PageContainer} from "../../style/GlobalWrappers";
import {connect} from "react-redux";
import {getMyStatisticsAction} from "../../store/actions/bloodRequestActions";
import GenderGraph from "./GenderGraph";


// setInterval(() => {
//     setState(getState());
// }, 2000)


const SeekerStatistics = ({userProfileReducer: {statistics}, dispatch}) => {

    useEffect(() => {
        dispatch(getMyStatisticsAction())
    }, [dispatch])


    return (
        <PageContainer>
            <GenderGraph statistics={statistics}/>
        </PageContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        userProfileReducer: state.userProfileReducer,
    };
};

export default connect(mapStateToProps)(SeekerStatistics);
