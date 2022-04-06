import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { WorkingDetailsStep } from '@/bounty/modals/AddBountyModal/components/WorkingDetailsStep'
import { WorkingPeriodType } from '@/bounty/modals/AddBountyModal/machine'
import { BN_ZERO } from '@/common/constants'
import { Member } from '@/memberships/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'bounty/AddBountyModal/WorkingDetailsStep',
  component: WorkingDetailsStep,
} as Meta

const WorkingDetailsStepTemplate: Story = () => {
  const [workingPeriodLength, setWorkingPeriodLength] = useState(BN_ZERO)
  const [workingPeriodWhitelist, setWorkingPeriodWhitelist] = useState<Member[]>([])
  const [, setWorkingPeriodType] = useState<WorkingPeriodType>()
  const [workingPeriodStake, setWorkingPeriodStake] = useState(BN_ZERO)
  return (
    <MockApolloProvider members>
      <WorkingDetailsStep
        setWorkingPeriodLength={setWorkingPeriodLength}
        setWorkingPeriodWhitelist={setWorkingPeriodWhitelist}
        setWorkingPeriodType={setWorkingPeriodType}
        setWorkingPeriodStake={setWorkingPeriodStake}
        workingPeriodType={'closed'}
        workingPeriodLength={workingPeriodLength}
        workingPeriodWhitelist={workingPeriodWhitelist}
        workingPeriodStake={workingPeriodStake}
        errorChecker={() => false}
        errorMessageGetter={() => undefined}
      />
    </MockApolloProvider>
  )
}

export const Default = WorkingDetailsStepTemplate.bind({})
