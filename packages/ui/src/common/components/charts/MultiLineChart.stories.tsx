import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Column, ModalBlock, Row, TemplateBlock, WhiteBlock } from '../storybookParts/previewStyles'

import { MultilineChart, MultilineChartData } from './MultiLineChart'

export default {
  title: 'Common/MultilineChart',
  component: MultilineChart,
  argTypes: {
    data: {
      control: false,
    },
  },
} as Meta

const Template: Story<{ data: MultilineChartData }> = (args) => (
  <ModalBlock>
    <TemplateBlock>
      <Row>
        <Column>
          <WhiteBlock style={{ padding: '20px', width: '800px', minHeight: '400px' }}>
            <MultilineChart {...args} />
          </WhiteBlock>
        </Column>
      </Row>
    </TemplateBlock>
  </ModalBlock>
)

const generateMonthData = (): MultilineChartData => {
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
  const stakeData = [50000, 52000, 51000, 53000]
  const rewardData = [1200, 1350, 1280, 1420]
  const barData = [0, 500, 0, 0]

  return {
    labels,
    stakeData,
    rewardData,
    barData,
    height: 300,
  }
}

const generateWeekData = (): MultilineChartData => {
  const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
  const stakeData = [50000, 50200, 50100, 50300, 50250, 50400, 50350]
  const rewardData = [300, 310, 305, 315, 312, 320, 318]
  const barData = [0, 0, 0, 0, 0, 0, 0]

  return {
    labels,
    stakeData,
    rewardData,
    barData,
    height: 300,
  }
}

const generateDayData = (): MultilineChartData => {
  const labels = ['0h', '6h', '12h', '18h']
  const stakeData = [50000, 50100, 50050, 50150]
  const rewardData = [50, 52, 51, 53]
  const barData = [0, 0, 0, 0]

  return {
    labels,
    stakeData,
    rewardData,
    barData,
    height: 300,
  }
}

export const MonthView = Template.bind({})
MonthView.args = {
  data: generateMonthData(),
}

export const WeekView = Template.bind({})
WeekView.args = {
  data: generateWeekData(),
}

export const DayView = Template.bind({})
DayView.args = {
  data: generateDayData(),
}
