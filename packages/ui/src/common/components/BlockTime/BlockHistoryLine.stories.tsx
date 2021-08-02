import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'

import { BlockHistoryLine } from './BlockHistoryLine'
import { BlockInfoProp } from './BlockInfo'

export default {
  title: 'Common/BlockTime/BlockHistoryLine',
  component: BlockHistoryLine,
} as Meta

const Template: Story<BlockInfoProp> = (args) => (
  <TemplateBlock>
    <BlockHistoryLine {...args} />
  </TemplateBlock>
)

export const Default = Template.bind({})
Default.args = {
  block: {
    number: 1000,
    network: 'OLYMPIA',
    timestamp: '2012-01-26T13:51:50.417-07:00',
  },
}
