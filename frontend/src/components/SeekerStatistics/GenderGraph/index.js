import React, {useEffect, useState} from "react";
import {Polar} from "react-chartjs-2";

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
            console.log("we got stats!")
            const newState = {...state}
            newState.datasets[0].data = getGenderData(statistics)
            setState(newState)
        }
    }, [statistics])


    return (
        <div>
            <h2>Gender Demographic</h2>
            {state ? <Polar data={state}/> : null}
        </div>)
}

export default GenderGraph