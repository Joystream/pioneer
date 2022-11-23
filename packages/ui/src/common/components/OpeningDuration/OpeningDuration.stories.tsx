import { Meta, Story } from '@storybook/react'
import React from 'react'

import { OpeningDuration, OpeningDurationProps } from '@/common/components/OpeningDuration/OpeningDuration'

export default {
  title: 'Common/Forms/OpeningDuration',
  component: OpeningDuration,
} as Meta

const Template: Story<OpeningDurationProps> = (args) => {
  return <OpeningDuration {...args} />
}
export const Default = Template.bind({})
Default.args = {
  label: 'Hiring period length',
}
