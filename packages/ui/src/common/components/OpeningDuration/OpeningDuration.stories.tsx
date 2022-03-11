import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React, { useState } from 'react'

import OpeningDuration, { OpeningDurationProps } from '@/common/components/OpeningDuration/OpeningDuration'

export default {
  title: 'Common/OpeningDuration',
  component: OpeningDuration,
} as Meta

const Template: Story<OpeningDurationProps> = (args) => {
  const [hiringPeriodLength, setHiringPeriodLength] = useState(new BN(4320))
  return (
    <OpeningDuration {...args} hiringPeriodLength={hiringPeriodLength} setHiringPeriodLength={setHiringPeriodLength} />
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'Enter your desired timeframe for accepting applications',
}
