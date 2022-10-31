import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import {
  EmptyPagePlaceholder,
  EmptyPagePlaceholderProps,
} from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'

export default {
  title: 'Common/EmptyPagePlaceholder',
  component: EmptyPagePlaceholder,
} as Meta

const Template: Story<EmptyPagePlaceholderProps> = (args) => <EmptyPagePlaceholder {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'This page seems to be empty',
  copy: 'Please be informed why this happened',
  button: <ButtonPrimary size="large">Insert a CTA</ButtonPrimary>,
}
