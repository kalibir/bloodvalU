import React, {useEffect, useState} from "react";
import {Doughnut} from "react-chartjs-2";

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
            '#CCC',
        ],
        hoverBackgroundColor: [
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
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
            {state ? <Doughnut data={state}/> : null}
        </div>)
}

export default BloodGroupGraph