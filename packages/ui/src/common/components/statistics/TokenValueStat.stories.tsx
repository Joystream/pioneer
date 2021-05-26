import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BlackBlock, ModalBlock, TemplateBlock, WhiteBlock } from '../storybookParts/previewStyles'

import { TokenValueStat, TokenValueStatProps } from './TokenValueStat'

export default {
  title: 'Common/TokenValueStat',
  component: TokenValueStat,
} as Meta

const Template: Story<TokenValueStatProps> = (args) => (
  <TemplateBlock>
    <WhiteBlock>
      <TokenValueStat {...args} />
    </WhiteBlock>
    <ModalBlock>
      <TokenValueStat {...args} />
    </ModalBlock>
    <BlackBlock>
      <TokenValueStat {...args} />
    </BlackBlock>
  </TemplateBlock>
)

export const TokenValue = Template.bind({})

TokenValue.args = {
  title: 'Statistic title',
  tooltipText: 'Text to help',
  value: 100000,
  tooltipTitle: 'Title to help',
  tooltipLinkText: 'More info',
  tooltipLinkURL: 'http://example.com/',
}
