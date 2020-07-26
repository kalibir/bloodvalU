import React, {useEffect, useState} from "react";
import {Polar} from "react-chartjs-2";

const goldenRatio = 0.618 // ... truncated

const initialState = {
    labels: [
        'O-',
        'O+',
        'A-',
        'A+',
        'B-',
        'B+',
        'AB-',
        'AB+',
    ],
    datasets: [{
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
            '#36A2EB',
            '#FFCE56',
            '#27AE60',
            '#8E44AD',
            '#E67E22',
            '#E74C3C',
            '#B7950B',
            '#145A32',
        ],
        hoverBackgroundColor: [
            '#36A2EB',
            '#FFCE56',
            '#27AE60',
            '#E67E22',
            '#E74C3C',
            '#B7950B',
            '#145A32',
        ]
    }]
}
const filterThis = (arr, param) =>{
    return arr.filter(el => el.blood_group === param).length
}
const getBloodGroupData = (stats) => {
    return [
        filterThis(stats, 'O-'),
        filterThis(stats, 'O+'),
        filterThis(stats, 'A-'),
        filterThis(stats, 'A+'),
        filterThis(stats, 'B-'),
        filterThis(stats, 'B+'),
        filterThis(stats, 'AB-'),
        filterThis(stats, 'AB+'),
    ]
}


const BloodGroupGraph = ({statistics}) => {

    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (statistics) {
            console.log("we got stats!")
            const newState = {...state}
            newState.datasets[0].data = getBloodGroupData(statistics)
            setState(newState)
        }
    }, [statistics])


    return (
        <div>
            <h2>Average Donor Blood Type</h2>
            {state ? <Polar data={state}/> : null}
        </div>)
}

export default BloodGroupGraph