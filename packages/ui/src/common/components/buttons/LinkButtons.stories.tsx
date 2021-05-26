import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TransferIcon } from '../icons'
import { Row, TemplateBlock } from '../storybookParts/previewStyles'

import {
  LinkButtonBareGhost,
  LinkButtonGhost,
  LinkButtonLink,
  LinkButtonPrimary,
  LinkButtonProps,
  LinkButtonSecondary,
} from './LinkButtons'

export default {
  title: 'Common/Buttons/LinkButtons',
  component: LinkButtonPrimary,
} as Meta

const Template: Story<LinkButtonProps> = (args) => (
  <TemplateBlock>
    <Row>
      <LinkButtonPrimary {...args} size="large">
        <TransferIcon />
        Large LinkButton
      </LinkButtonPrimary>
      <LinkButtonPrimary {...args} size="large" square>
        <TransferIcon />
      </LinkButtonPrimary>
      <LinkButtonPrimary {...args} size="medium">
        <TransferIcon />
        Medium buttom
      </LinkButtonPrimary>
      <LinkButtonPrimary {...args} size="medium" square>
        <TransferIcon />
      </LinkButtonPrimary>
      <LinkButtonPrimary {...args} size="small">
        <TransferIcon />
        Small LinkButton
      </LinkButtonPrimary>
      <LinkButtonPrimary {...args} size="small" square>
        <TransferIcon />
      </LinkButtonPrimary>
    </Row>

    <Row>
      <LinkButtonSecondary {...args} size="large">
        <TransferIcon />
        Large LinkButton
      </LinkButtonSecondary>
      <LinkButtonSecondary {...args} size="large" square>
        <TransferIcon />
      </LinkButtonSecondary>
      <LinkButtonSecondary {...args} size="medium">
        <TransferIcon />
        Medium buttom
      </LinkButtonSecondary>
      <LinkButtonSecondary {...args} size="medium" square>
        <TransferIcon />
      </LinkButtonSecondary>
      <LinkButtonSecondary {...args} size="small">
        <TransferIcon />
        Small LinkButton
      </LinkButtonSecondary>
      <LinkButtonSecondary {...args} size="small" square>
        <TransferIcon />
      </LinkButtonSecondary>
    </Row>

    <Row>
      <LinkButtonGhost {...args} size="large">
        <TransferIcon />
        Large LinkButton
      </LinkButtonGhost>
      <LinkButtonGhost {...args} size="large" square>
        <TransferIcon />
      </LinkButtonGhost>
      <LinkButtonGhost {...args} size="medium">
        <TransferIcon />
        Medium buttom
      </LinkButtonGhost>
      <LinkButtonGhost {...args} size="medium" square>
        <TransferIcon />
      </LinkButtonGhost>
      <LinkButtonGhost {...args} size="small">
        <TransferIcon />
        Small LinkButton
      </LinkButtonGhost>
      <LinkButtonGhost {...args} size="small" square>
        <TransferIcon />
      </LinkButtonGhost>
    </Row>
    <Row>
      <LinkButtonBareGhost {...args} size="large">
        <TransferIcon />
        Large LinkButton
      </LinkButtonBareGhost>
      <LinkButtonBareGhost {...args} size="large" square>
        <TransferIcon />
      </LinkButtonBareGhost>
      <LinkButtonBareGhost {...args} size="medium">
        <TransferIcon />
        Medium buttom
      </LinkButtonBareGhost>
      <LinkButtonBareGhost {...args} size="medium" square>
        <TransferIcon />
      </LinkButtonBareGhost>
      <LinkButtonBareGhost {...args} size="small">
        <TransferIcon />
        Small LinkButton
      </LinkButtonBareGhost>
      <LinkButtonBareGhost {...args} size="small" square>
        <TransferIcon />
      </LinkButtonBareGhost>
    </Row>
    <Row>
      <LinkButtonLink {...args}>
        <TransferIcon />
        Link LinkButton
      </LinkButtonLink>
    </Row>
  </TemplateBlock>
)

export const LinkButtonsComponent = Template.bind({})

LinkButtonsComponent.args = {
  disabled: false,
}
