import { Chart } from 'chart.js/auto'
import React from 'react'
import { Line } from 'react-chartjs-2'

Chart.register()

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      borderColor: 'blue',
      tension: 0.2,
      pointRadius: 0,
    },
  ],
}

const options  = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.9)',
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      //   ticks: {
      //     color: "blue",
      //     font: {
      //       size: 14,
      //       weight: "bold",
      //     },
      //   },
    },
  },
}

const LineChart = () => {
  return <Line data={data} options={options} />
}

export default LineChart
