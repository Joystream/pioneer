import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Row, TemplateBlock, ModalBlock } from '@/common/components/storybookParts/previewStyles'

import { BlockTime, BlockTimeProps } from './BlockTime'

export default {
  title: 'Common/BlockTime',
  component: BlockTime,
} as Meta

const Template: Story<BlockTimeProps> = (args) => (
  <TemplateBlock>
    <Row>
      <ModalBlock>
        <BlockTime {...args} />
      </ModalBlock>
    </Row>
    <Row>
      <BlockTime {...args} layout="row" dateLabel="Text" />
    </Row>
  </TemplateBlock>
)

export const BlockTimeView = Template.bind({})
BlockTimeView.args = {
  block: {
    number: 1000,
    network: 'OLYMPIA',
    timestamp: '2012-01-26T13:51:50.417-07:00',
  },
}
