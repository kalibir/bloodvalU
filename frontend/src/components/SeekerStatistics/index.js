import React, {useEffect} from "react";
import {PageContainer} from "../../style/GlobalWrappers";
import {connect} from "react-redux";
import {getMyStatisticsAction} from "../../store/actions/bloodRequestActions";
import GenderGraph from "./GenderGraph";
import BloodGroupGraph from "./BloodGroupGraph";
import styled from "styled-components";
import AgeGraph from "./AgeGraph";
import rem from "polished/lib/helpers/rem";



// setInterval(() => {
//     setState(getState());
// }, 2000)

const StatsContent = styled.div`
  display: grid;
  grid-gap: ${rem("16px")};
  grid-template-areas: 
  "title title title title"
  ". . . ."
  "age age age age"
  "gender gender blood blood";
  justify-content: center;
`


const Title = styled.h1`
  grid-area: title;
`


const SeekerStatistics = ({userProfileReducer: {statistics}, dispatch}) => {

    useEffect(() => {
        dispatch(getMyStatisticsAction())
    }, [dispatch])


    return (
        <PageContainer>
            <StatsContent>
                <Title>Analytics</Title>
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
