import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BlackBlock, Column, ModalBlock, Row, TemplateBlock, WhiteBlock } from '../storybookParts/previewStyles'

import { PercentageChartProps, PercentageChart } from './PercentageChart'

export default {
  title: 'Common/PercentageChart',
  component: PercentageChart,
} as Meta

const Template: Story<PercentageChartProps> = (args) => (
  <ModalBlock>
    <TemplateBlock>
      <Row>
        <Column>
          <WhiteBlock>
            <PercentageChart {...args} />
          </WhiteBlock>
        </Column>
        <Column>
          <BlackBlock>
            <PercentageChart {...args} isOnBlack />
          </BlackBlock>
        </Column>
      </Row>
    </TemplateBlock>
  </ModalBlock>
)

export const PercentageChartComponent = Template.bind({})

PercentageChartComponent.args = {
  percentage: 65,
}
