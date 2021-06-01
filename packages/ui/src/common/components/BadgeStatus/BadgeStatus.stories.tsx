import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Row, TemplateBlock } from '../storybookParts/previewStyles'

import { BadgeStatus, BadgeStatusProps } from './BadgeStatus'

export default {
  title: 'Common/Badge/BadgeStatus',
  component: BadgeStatus,
} as Meta

const Template: Story<BadgeStatusProps> = (args) => (
  <TemplateBlock>
    <Row>
      <BadgeStatus {...args} size="l">
        Large size
      </BadgeStatus>
      <BadgeStatus {...args} inverted size="l">
        Large size
      </BadgeStatus>
      <BadgeStatus {...args} ended size="l">
        Large size
      </BadgeStatus>
    </Row>

    <Row>
      <BadgeStatus {...args} size="m">
        Medium size
      </BadgeStatus>
      <BadgeStatus {...args} inverted size="m">
        Medium size
      </BadgeStatus>
      <BadgeStatus {...args} ended size="m">
        Medium size
      </BadgeStatus>
    </Row>

    <Row>
      <BadgeStatus {...args} size="l" separated>
        Large size - separated
      </BadgeStatus>
    </Row>
    <Row>
      <BadgeStatus {...args} size="m" separated>
        Medium size - separated
      </BadgeStatus>
    </Row>
  </TemplateBlock>
)

export const BadgeStatusComponent = Template.bind({})
