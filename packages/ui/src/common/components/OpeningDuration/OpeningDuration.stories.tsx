import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import OpeningDuration, { InputValues, OpeningDurationProps } from '@/common/components/OpeningDuration/OpeningDuration'

export default {
  title: 'Common/Forms/OpeningDuration',
  component: OpeningDuration,
} as Meta

const Template: Story<OpeningDurationProps> = (args) => {
  const [isLimited, setIsLimited] = useState<InputValues>({ isLimited: true, length: 43200 })
  return <OpeningDuration {...args} value={isLimited} onChange={setIsLimited} />
}
export const Default = Template.bind({})
Default.args = {
  label: 'Hiring period length',
}
