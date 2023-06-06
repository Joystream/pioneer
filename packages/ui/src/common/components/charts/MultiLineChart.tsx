import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

export type MultilineChartData = {
    height?: number,
    labels: string[];
    rewardData: number[];
    stakeData: number[];
    barData: number[];
};

type MultilineChartProps = {
    data: MultilineChartData;
};


export const MultilineChart = ({ data }: MultilineChartProps) => {

    const options: ChartOptions<'bar' | 'line'> = {
        plugins: {
            legend: {
                position: 'bottom',
                align: "start"
            },
        },
    };


    const chartData = {
        labels: data.labels,
        datasets: [
            {
                type: 'line' as const,
                label: 'stake',
                borderColor: '#424242',
                backgroundColor: "#424242",
                borderWidth: 3,
                pointRadius: [5, 0],
                fill: false,
                data: data.stakeData,
            },
            {
                type: 'line' as const,
                label: 'reward',
                borderColor: '#3F38FF',
                backgroundColor: "#3F38FF",
                borderWidth: 3,
                pointRadius: [5, 0],
                fill: false,
                data: data.rewardData,
            },
            {
                type: 'bar' as const,
                label: 'slashed',
                backgroundColor: '#A7AAFF',
                data: data.barData,
                borderColor: 'white',
                borderWidth: 1,
                barThickness: 15
            }
        ],
    };


    return (
        <div>
            <Chart type="line"
                data={chartData}
                height={data.height ? data.height : 60}
                options={options}
            />
        </div>
    );
};

export default MultilineChart;