import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { TemplateBlock } from '../storybookParts/previewStyles'
import { TextMedium } from '../typography'

import { DurationStatistics } from './DurationStatistics'
import { MultiValueStat } from './MultiValueStat'
import { StatisticBar } from './StatisticBar'
import { StatisticItem, StatisticItemProps, StatsBlock } from './StatisticItem'
import { Statistics } from './Statistics'
import { TokenValueStat } from './TokenValueStat'

export default {
  title: 'Common/Statistics',
  component: Statistics,
} as Meta

const Template: Story<StatisticItemProps> = (args) => (
  <TemplateBlock>
    <Statistics>
      <TokenValueStat {...args} title="Token value stat" value={new BN(100_000)} />

      <MultiValueStat
        {...args}
        title="Multi token value"
        values={[
          { label: 'Amount', value: new BN(150_000) },
          { label: 'Period lenght', value: new BN(738), type: 'blocks' },
        ]}
      />

      <StatisticItem {...args}>
        <TextMedium>Inner text</TextMedium>
      </StatisticItem>

      <DurationStatistics title="Duration value" value="2032-03-09T10:18:04.155Z" />

      <StatsBlock>
        <StatisticBar {...args} value={0.4} threshold={0.6} numerator={8} denominator="20 votes" />
      </StatsBlock>
    </Statistics>
  </TemplateBlock>
)

export const Statistic = Template.bind({})

Statistic.args = {
  title: 'Statistic item',
  tooltipText: 'Text to help',
  tooltipTitle: 'Title to help',
  tooltipLinkText: 'More info',
}
