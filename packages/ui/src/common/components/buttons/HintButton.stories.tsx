import { Meta, Story } from '@storybook/react'
import React from 'react'

import { HintButton } from '@/common/components/buttons/HintButton'

import { Row, TemplateBlock } from '../storybookParts/previewStyles'

export default {
  title: 'Common/Buttons/HintButton',
  component: HintButton,
} as Meta

const Template: Story = () => (
  <TemplateBlock>
    <Row>
      <HintButton />
      <HintButton isActive />
    </Row>
  </TemplateBlock>
)

export const HintButtonComponent = Template.bind({})

HintButtonComponent.args = {}
