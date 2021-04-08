import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Row, Column, TemplateBlock } from '../storybookParts/previewStyles'

import { CopyButton, CopyButtonProps } from './CopyButton'

export default {
  title: 'Common/CopyButton',
  component: CopyButton,
} as Meta

const Template: Story<CopyButtonProps> = (args) => (
  <TemplateBlock>
    <Column>
      <Row>
        Enabled
        <CopyButton {...args} textToCopy="Text to copy 1" />
      </Row>
      <Row>
        Disabled
        <CopyButton {...args} textToCopy="Text to copy 2" disabled />
      </Row>
      <Row>
        With error
        <CopyButton {...args} textToCopy={undefined} />
      </Row>
    </Column>
  </TemplateBlock>
)

export const CloseButtonComponent = Template.bind({})

CloseButtonComponent.args = {}
