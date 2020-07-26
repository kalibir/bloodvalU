import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import dayjs from "dayjs";
import 'dayjs/locale/es'


const getLabels = (amountOfDays, format) => {
    let labels = []
    for (let i = 0; i < amountOfDays; i++) {
        labels.push(dayjs().subtract(i, 'day').format(format))
    }
    return labels.reverse()
}
// useEffect(() => {
//     if (statistics) {
//         console.log(dayjs(statistics[0].created).format('DD/MM/YYYY'))
//         console.log(dayjs(statistics[0].created).subtract(1, 'day').format('DD/MM/YYYY'))
//         // console.log(dayjs(statistics[0].created))
//     }
// }, [statistics])

getLabels(7, 'dddd')

const filterAll = (arr, min, max) => {
    return arr.filter(el => el.age >= min && el.age <= max).length
}
const filterMale = (arr, min, max) => {
    return arr.filter(el => el.age >= min && el.age <= max && el.gender === "M").length
}
const filterFemale = (arr, min, max) => {
    return arr.filter(el => el.age >= min && el.age <= max && el.gender === "F").length
}
const getAgeData = (func, stats) => {
    return [
        func(stats, 18, 19),
        func(stats, 20, 29),
        func(stats, 30, 39),
        func(stats, 40, 49),
        func(stats, 50, 59),
        func(stats, 60, 69),
        func(stats, 70, 150)
    ]
}

const options = {
                    responsive: true,
                    title: {text: "THICCNESS SCALE", display: true},
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: false
                                }
                            }
                        ],
                        xAxes: [
                            {
                                gridLines: {
                                    display: false
                                }
                            }
                        ]
                    }
                }


const initialState = {
    labels: ['18-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'],
    datasets: [
        {
            label: 'Blood Donation Applicants',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            label: 'Male Applicants',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgb(202,131,93)',
            borderColor: 'rgb(122,81,81)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(192,130,75)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(192,130,75)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            label: 'Female Applicants',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgb(156,106,200)',
            borderColor: 'rgb(122,81,81)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 0, 0, 0, 0, 0, 0]
        },

    ]
};

const AgeGraph = ({statistics}) => {

    const [state, setState] = useState(initialState);


    useEffect(() => {
        if (statistics) {
            console.log("we got stats!")
            const newState = {...state}
            newState.datasets[0].data = getAgeData(filterAll, statistics)
            newState.datasets[1].data = getAgeData(filterMale, statistics)
            newState.datasets[2].data = getAgeData(filterFemale, statistics)
            setState(newState)
        }
    }, [statistics])


    return (
        <div>
            <h2>Average Donor Age Group</h2>
            {state ? <Line
                width={600}
                height={300}
                data={state}
                options={options}
            /> : null}
        </div>)
}

export default AgeGraph