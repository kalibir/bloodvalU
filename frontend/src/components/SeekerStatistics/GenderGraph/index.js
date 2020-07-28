import React, {useEffect, useState} from "react";
import {Pie} from "react-chartjs-2";
import styled from "styled-components";
import {BaseChartWrapper} from "../../../style/GlobalWrappers";
import {ChartTitle} from "../../../style/GlobalTitles";

const Wrapper = styled(BaseChartWrapper)`
  grid-area: gender;
`

const initialState = {
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
            '#FF6384',
        ],
        hoverBackgroundColor: [
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
        ]
    }]
}

const getGenderData = (stats) => {
    return [stats.filter(el => el.gender === "M").length, stats.filter(el => el.gender === "F").length, stats.filter(el => el.gender === "O").length]
}



const GenderGraph = ({statistics}) => {

    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (statistics) {
            const newState = {...state}
            newState.datasets[0].data = getGenderData(statistics)
            setState(newState)
        }
    }, [statistics])


    return (
        <Wrapper>
            <ChartTitle>Gender Demographic</ChartTitle>
            {state ? <Pie data={state}/> : null}
        </Wrapper>)
}

export default GenderGraph