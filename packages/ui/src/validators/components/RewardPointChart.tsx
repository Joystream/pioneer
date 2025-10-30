import { Chart } from 'chart.js/auto'
import React from 'react'
import { Line } from 'react-chartjs-2'

import { RewardPoints } from '../types'

Chart.register()

interface Data {
  rewardPointsHistory: RewardPoints[]
}

type Mode = 'index' | 'dataset' | 'point' | 'nearest' | 'x' | 'y' | undefined

const RewardPointChart = ({ rewardPointsHistory }: Data) => {
  const sortedRewardsHistory = rewardPointsHistory.sort((a, b) => a.era - b.era)
  const eras = sortedRewardsHistory.map((item) => item.era)
  const rewardPoints = sortedRewardsHistory.map((item) => item.rewardPoints)
  const averageRewardPoints = rewardPoints.reduce((a, b) => a + b, 0) / rewardPoints.length
  const averageLine = Array(eras.length).fill(averageRewardPoints)

  const data = {
    labels: eras,
    datasets: [
      {
        label: 'Era points',
        data: rewardPoints,
        fill: false,
        borderColor: 'blue',
        borderWidth: 2,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: 'Average points',
        data: averageLine,
        fill: false,
        borderColor: 'black',
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as Mode,
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  }
  return <Line data={data} options={options} />
}

export default RewardPointChart
