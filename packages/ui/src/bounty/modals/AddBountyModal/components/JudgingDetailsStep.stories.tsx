import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { JudgingDetailsStep } from '@/bounty/modals/AddBountyModal/components/JudgingDetailsStep'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'bounty/AddBountyModal/JudgingDetailsStep',
  component: JudgingDetailsStep,
} as Meta

const JudgingDetailsStepTemplate: Story = () => {
  const [judgingPeriodLength, setJudgingPeriodLength] = useState(0)
  const [oracle, setOracle] = useState<any>()

  return (
    <MockApolloProvider members>
      <JudgingDetailsStep
        judgingPeriodLength={judgingPeriodLength}
        oracle={oracle}
        setJudgingPeriodLength={setJudgingPeriodLength}
        setOracle={setOracle}
      />
    </MockApolloProvider>
  )
}

export const Default = JudgingDetailsStepTemplate.bind({})
