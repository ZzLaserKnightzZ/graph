import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [500,200,300,532,564,976,699],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [500,200,20,532,664,946,789],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Dataset 3',
            data: [500,200,300,532,764,976,899],
            backgroundColor: 'rgba(224, 20, 65, 0.5)',
        },
        {
            label: 'Dataset 4',
            data: [500,100,300,432,264,976,699],
            backgroundColor: 'rgba(105, 160, 197, 0.5)',
        },
    ],
};

export function TestPage3() {
    return <div style={{ width: "100%", height: "100vh" }}>  <Bar options={options} data={data} /></div>;
}