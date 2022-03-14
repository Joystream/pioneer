import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React, { useState } from 'react'

import OpeningDuration, { OpeningDurationProps } from '@/common/components/OpeningDuration/OpeningDuration'

export default {
  title: 'Common/Forms/OpeningDuration',
  component: OpeningDuration,
} as Meta

const Template: Story<OpeningDurationProps> = (args) => {
  const [isLimited, setIsLimited] = useState(new BN(0))
  return <OpeningDuration {...args} value={isLimited} onChange={setIsLimited} />
}

export const Default = Template.bind({})
Default.args = {
  label: 'Hiring period length',
}
