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

getLabels(7, 'dddd')


const initialState = {
    labels: ['18-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'],
    datasets: [
        {
            label: 'Blood Donation Frequency by Age Group',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            // borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            // borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 20,0,0, 55, 40]
        },

    ]
};

const filterThis = (arr, param) => {
    return arr.filter(el => el.blood_group === param).length
}

const AgeGraph = ({statistics}) => {

    const [state, setState] = useState(initialState);
    useEffect(() => {
        if (statistics) {
            console.log(dayjs(statistics[0].created).format('DD/MM/YYYY'))
            console.log(dayjs(statistics[0].created).subtract(1, 'day').format('DD/MM/YYYY'))
            // console.log(dayjs(statistics[0].created))
        }
    }, [statistics])


    return (
        <div>
            <h2>Average Donor Blood Type</h2>
            {state ? <Line
                width={600}
                height={300}
                data={state}
                options={{responsive: true}}
            /> : null}
        </div>)
}

export default AgeGraph