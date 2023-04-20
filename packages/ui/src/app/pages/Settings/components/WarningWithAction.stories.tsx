import { Meta, Story } from '@storybook/react'
import * as faker from 'faker'
import React from 'react'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'

import { TextMedium } from '@/common/components/typography'
import { WarningWithActionProps, WarningWithAction } from './WarningWithAction'
import { InfoBannerIcon } from './InfoBannerIcon'
import { ButtonGhost } from '@/common/components/buttons'

export default {
  title: 'Common/WarningWithAction',
  component: WarningWithAction,
  argTypes: {
    steps: {
      control: false,
    },
  },
} as Meta

const Template: Story<WarningWithActionProps> = (args) => {
  return (
    <TemplateBlock>
      <WarningWithAction {...args}>
        <TextMedium lighter>{faker.lorem.paragraph()}</TextMedium>
      </WarningWithAction>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})
Default.args = {
  icon: <InfoBannerIcon />,
  title: 'Title',
  button: <ButtonGhost size="small"> Button </ButtonGhost>,
  description: 'Action description ...',
}
