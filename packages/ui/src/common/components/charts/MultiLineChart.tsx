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
} from 'chart.js'
import React from 'react'
import { Chart } from 'react-chartjs-2'

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
)

export type MultilineChartData = {
  height?: number
  labels: string[]
  rewardData: number[]
  stakeData: number[]
  barData: number[]
}

type MultilineChartProps = {
  data: MultilineChartData
}

export const MultilineChart = ({ data }: MultilineChartProps) => {
  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  // Ensure we have valid data arrays
  const labels = data.labels && data.labels.length > 0 ? data.labels : ['No Data']
  const stakeData = data.stakeData && data.stakeData.length > 0 ? data.stakeData : [0]
  const rewardData = data.rewardData && data.rewardData.length > 0 ? data.rewardData : [0]
  const barData = data.barData && data.barData.length > 0 ? data.barData : [0]

  const chartData = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'stake',
        borderColor: '#424242',
        backgroundColor: '#424242',
        borderWidth: 3,
        pointRadius: [5, 0],
        fill: false,
        data: stakeData,
      },
      {
        type: 'line' as const,
        label: 'reward',
        borderColor: '#3F38FF',
        backgroundColor: '#3F38FF',
        borderWidth: 3,
        pointRadius: [5, 0],
        fill: false,
        data: rewardData,
      },
      {
        type: 'bar' as const,
        label: 'slashed',
        backgroundColor: '#A7AAFF',
        data: barData,
        borderColor: 'white',
        borderWidth: 1,
        barThickness: 15,
      },
    ],
  }

  const chartHeight = data.height || 300

  return (
    <div style={{ height: `${chartHeight}px`, position: 'relative' }}>
      <Chart type="line" data={chartData} height={chartHeight} options={options} />
    </div>
  )
}

export default MultilineChart
