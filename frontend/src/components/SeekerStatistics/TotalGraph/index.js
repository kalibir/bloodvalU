import React, {useEffect, useState} from "react";
import {Pie} from "react-chartjs-2";
import styled from "styled-components";
import {BaseChartWrapper} from "../../../style/GlobalWrappers";
import {ChartTitle} from "../../../style/GlobalTitles";

const Wrapper = styled(BaseChartWrapper)`
  grid-area: total;
`

const initialState = {
    labels: [
        'Open',
        'On Going',
        'Completed'
    ],
    datasets: [{
        data: [0, 0, 0],
        backgroundColor: [
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
        ],
        hoverBackgroundColor: [
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
        ]
    }]
}

const TotalGraph = ({profile}) => {

    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (profile) {
            console.log("we got stats!")
            const newState = {...state}
            newState.datasets[0].data = [profile.no_of_open, profile.no_of_closed, profile.no_of_completed]
            setState(newState)
        }
    }, [profile])


    return (
        <Wrapper >
            <ChartTitle>Total Requests</ChartTitle>
            {state ? <Pie data={state}/> : null}
        </Wrapper>)
}

export default TotalGraph