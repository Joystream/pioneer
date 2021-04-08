import { Meta, Story } from '@storybook/react'
import React from 'react'
import { TransferIcon } from '../icons'
import { Row, TemplateBlock } from '../storybookParts/previewStyles'
import { ButtonGhost, ButtonPrimary, ButtonProps, ButtonSecondary } from './Buttons'

export default {
  title: 'Common/Buttons',
  component: ButtonPrimary,
} as Meta

const Template: Story<ButtonProps> = (args) => (
  <TemplateBlock>
    <Row>
      <ButtonPrimary {...args} size="large">
        <TransferIcon />
        Large button
      </ButtonPrimary>
      <ButtonPrimary {...args} size="large" square>
        <TransferIcon />
      </ButtonPrimary>
      <ButtonPrimary {...args} size="medium">
        <TransferIcon />
        Medium buttom
      </ButtonPrimary>
      <ButtonPrimary {...args} size="medium" square>
        <TransferIcon />
      </ButtonPrimary>
      <ButtonPrimary {...args} size="small">
        <TransferIcon />
        Small button
      </ButtonPrimary>
      <ButtonPrimary {...args} size="small" square>
        <TransferIcon />
      </ButtonPrimary>
    </Row>

    <Row>
      <ButtonSecondary {...args} size="large">
        <TransferIcon />
        Large button
      </ButtonSecondary>
      <ButtonSecondary {...args} size="large" square>
        <TransferIcon />
      </ButtonSecondary>
      <ButtonSecondary {...args} size="medium">
        <TransferIcon />
        Medium buttom
      </ButtonSecondary>
      <ButtonSecondary {...args} size="medium" square>
        <TransferIcon />
      </ButtonSecondary>
      <ButtonSecondary {...args} size="small">
        <TransferIcon />
        Small button
      </ButtonSecondary>
      <ButtonSecondary {...args} size="small" square>
        <TransferIcon />
      </ButtonSecondary>
    </Row>

    <Row>
      <ButtonGhost {...args} size="large">
        <TransferIcon />
        Large button
      </ButtonGhost>
      <ButtonGhost {...args} size="large" square>
        <TransferIcon />
      </ButtonGhost>
      <ButtonGhost {...args} size="medium">
        <TransferIcon />
        Medium buttom
      </ButtonGhost>
      <ButtonGhost {...args} size="medium" square>
        <TransferIcon />
      </ButtonGhost>
      <ButtonGhost {...args} size="small">
        <TransferIcon />
        Small button
      </ButtonGhost>
      <ButtonGhost {...args} size="small" square>
        <TransferIcon />
      </ButtonGhost>
    </Row>
  </TemplateBlock>
)

export const ButtonsComponent = Template.bind({})

ButtonsComponent.args = {}
