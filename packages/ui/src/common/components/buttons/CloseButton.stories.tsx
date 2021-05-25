import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Row, TemplateBlock } from '../storybookParts/previewStyles'

import { CloseButton } from './CloseButton'

export default {
  title: 'Common/Buttons/CloseButton',
  component: CloseButton,
} as Meta

const Template: Story = () => (
  <TemplateBlock>
    <Row>
      <CloseButton />
      <CloseButton disabled />
    </Row>
  </TemplateBlock>
)

export const CloseButtonComponent = Template.bind({})

CloseButtonComponent.args = {}
