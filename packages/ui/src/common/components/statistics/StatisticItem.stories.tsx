import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BlackBlock, ModalBlock, TemplateBlock, WhiteBlock } from '../storybookParts/previewStyles'

import { StatisticItem, StatisticItemProps } from './StatisticItem'

export default {
  title: 'Common/Statistics',
  component: StatisticItem,
} as Meta

const Template: Story<StatisticItemProps> = (args) => (
  <TemplateBlock>
    <WhiteBlock>
      <StatisticItem {...args} />
    </WhiteBlock>
    <ModalBlock>
      <StatisticItem {...args} />
    </ModalBlock>
    <BlackBlock>
      <StatisticItem {...args} />
    </BlackBlock>
  </TemplateBlock>
)

export const StatisticItemComponent = Template.bind({})

StatisticItemComponent.args = {
  title: 'Statistic title',
  helperText: 'Text to help',
  value: 100000,
  helperTitle: 'Title to help',
  helperLinkText: 'More info',
  helperLinkURL: 'http://example.com/',
}
