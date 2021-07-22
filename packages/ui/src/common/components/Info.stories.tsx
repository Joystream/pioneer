import { Meta, Story } from '@storybook/react'
import * as faker from 'faker'
import React from 'react'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { TextMedium } from '@/common/components/typography'

import { Info, InfoProps } from './Info'

export default {
  title: 'Common/Info',
  component: Info,
  argTypes: {
    steps: {
      control: false,
    },
  },
} as Meta

const Template: Story<InfoProps> = (args) => {
  return (
    <TemplateBlock>
      <h3>With title:</h3>
      <Info {...args}>
        <TextMedium>{faker.lorem.paragraph()}</TextMedium>
      </Info>

      <h3>Without title:</h3>
      <Info>
        <TextMedium>{faker.lorem.paragraph()}</TextMedium>
      </Info>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'Foo bar baz',
}
