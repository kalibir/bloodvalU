import React, {useEffect, useState} from "react";
import {PageContainer} from "../../style/GlobalWrappers";
import {connect} from "react-redux";
import {getMyStatisticsAction} from "../../store/actions/bloodRequestActions";
import {Doughnut} from "react-chartjs-2";

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getGenderData = (stats) => {
    return [stats.filter(el => el.gender === "M").length, stats.filter(el => el.gender === "F").length, stats.filter(el => el.gender === "O").length]
}

const SeekerStatistics = ({userProfileReducer: {statistics}, dispatch}) => {
    console.log("statistics", statistics);

    const [state, setState] = useState({
        labels: [
            'Male',
            'Female',
            'Other'
        ],
        datasets: [{
            data: [0, 0, 0],
            backgroundColor: [
                '#36A2EB',
                '#FFCE56',
                '#CCC',
            ],
            hoverBackgroundColor: [
                '#36A2EB',
                '#FFCE56',
                '#FF6384',
            ]
        }]
    });


    useEffect(async () => {
        const response = await dispatch(getMyStatisticsAction())
        if (response.status < 300) setState({...state, datasets: {data: getGenderData(response.data)}})
        // setInterval(() => {
        //     setState(getState());
        // }, 2000)
    }, [dispatch])


    return (
        <PageContainer>
            <div>
                <h2>Gender Demographic</h2>
                {state ? <Doughnut data={state}/> : null}
            </div>
        </PageContainer>
    )
}

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        userProfileReducer: state.userProfileReducer,
    };
};

export default connect(mapStateToProps)(SeekerStatistics);
