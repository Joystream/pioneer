import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Notification, NotificationProps } from './Notification'
import { Row, TemplateBlock, WhiteBlock, ModalBlock, BlackBlock } from './storybookParts/previewStyles'

export default {
  title: 'Common/NotificationComponent',
  component: Notification,
} as Meta

const Template: Story<NotificationProps> = (args) => (
  <TemplateBlock>
    <Row>
      <WhiteBlock>
        <Notification {...args} />
      </WhiteBlock>
      <ModalBlock>
        <Notification {...args} />
      </ModalBlock>
      <BlackBlock>
        <Notification {...args} />
      </BlackBlock>
    </Row>
  </TemplateBlock>
)

export const NotificationComponent = Template.bind({})

NotificationComponent.args = {
  hasNotification: true,
}
