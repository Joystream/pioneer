import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { BlackBlock, ModalBlock, TemplateBlock, WhiteBlock } from '../storybookParts/previewStyles'

import { TokenValueStat, TokenValueStatProps } from './TokenValueStat'

export default {
  title: 'Common/Statistics/TokenValueStat',
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
  value: new BN(100000),
  tooltipTitle: 'Title to help',
  tooltipLinkText: 'More info',
  tooltipLinkURL: 'http://example.com/',
}
