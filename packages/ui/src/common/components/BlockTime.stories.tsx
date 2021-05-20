import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BlockTime, BlockTimeProps } from './BlockTime'
import { Row, TemplateBlock, ModalBlock } from './storybookParts/previewStyles'

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
      <BlockTime {...args} horizontal dateLabel="Text" />
    </Row>
  </TemplateBlock>
)

export const BlockTimeView = Template.bind({})
BlockTimeView.args = {
  block: {
    id: '100',
    number: 1000,
    network: 'OLYMPIA',
    timestamp: '2012-01-26T13:51:50.417-07:00',
  },
}
