import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { TemplateBlock } from '../storybookParts/previewStyles'
import { TextMedium } from '../typography'

import { DurationStatistics } from './DurationStatistics'
import { MultiTokenValueStat } from './MultiTokenValueStat'
import { StatisticItem, StatisticItemProps } from './StatisticItem'
import { Statistics } from './Statistics'
import { TokenValueStat } from './TokenValueStat'

export default {
  title: 'Common/Statistics',
  component: Statistics,
} as Meta

const Template: Story<StatisticItemProps> = (args) => (
  <TemplateBlock>
    <Statistics>
      <TokenValueStat {...args} title="Token value stat" value={100_000} />
      <MultiTokenValueStat
        {...args}
        title="Multi token value"
        values={[
          { label: '24 hours', value: new BN(257) },
          { label: 'Month', value: new BN(123_001) },
        ]}
      />
      <StatisticItem {...args}>
        <TextMedium>Inner text</TextMedium>
      </StatisticItem>
      <DurationStatistics title="Duration value" value="2032-03-09T10:18:04.155Z" />
    </Statistics>
  </TemplateBlock>
)

export const Statistic = Template.bind({})

Statistic.args = {
  title: 'Statistic item',
  helperText: 'Text to help',
  helperTitle: 'Title to help',
  helperLinkText: 'More info',
  helperLinkURL: 'http://example.com/',
}
