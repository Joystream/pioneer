import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'

import { BlockHistoryLine, BlockHistoryLineProps } from './BlockHistoryLine'

export default {
  title: 'Common/BlockTime/BlockHistoryLine',
  component: BlockHistoryLine,
} as Meta

const Template: Story<BlockHistoryLineProps> = (args) => (
  <TemplateBlock>
    <BlockHistoryLine {...args} />
  </TemplateBlock>
)

export const Default = Template.bind({})
Default.args = {
  block: {
    id: '100',
    number: 1000,
    network: 'OLYMPIA',
    timestamp: '2012-01-26T13:51:50.417-07:00',
  },
}
