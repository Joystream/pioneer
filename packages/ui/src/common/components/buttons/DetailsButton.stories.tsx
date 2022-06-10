import { Meta, Story } from '@storybook/react'
import React from 'react'

import { DetailsButton, DetailsButtonProps } from '@/common/components/buttons/DetailsButton'
import { SignOutIcon } from '@/common/components/page/Sidebar/LinksIcons/SignOutIcon'

import { Row, TemplateBlock } from '../storybookParts/previewStyles'

export default {
  title: 'Common/Buttons/DetailsButton',
  component: DetailsButton,
} as Meta

const Template: Story<DetailsButtonProps> = (args) => (
  <TemplateBlock>
    <Row>
      <DetailsButton {...args} />
    </Row>
  </TemplateBlock>
)

export const DetailsButtonComponent = Template.bind({})

DetailsButtonComponent.args = {
  subtitleText: 'subtitle Text',
  titleText: 'title Text',
  icon: <SignOutIcon />,
  onClick: () => '',
}
