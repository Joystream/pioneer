import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { BN_ZERO } from '@/common/constants'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { FundingDetailsStep } from './FundingDetailsStep'

export default {
  title: 'bounty/AddBountyModal/FundingDetailsStep',
  component: FundingDetailsStep,
} as Meta

const FundingDetailsTemplate: Story = () => {
  const [fundingMaximalRange, setFundingMaximalRange] = useState(BN_ZERO)
  const [fundingMinimalRange, setFundingMinimalRange] = useState(BN_ZERO)
  const [cherry, setCherry] = useState(BN_ZERO)
  const [, setFundingPeriodType] = useState('')
  const [fundingPeriodLength, setFundingPeriodLength] = useState(0)

  return (
    <MockApolloProvider members>
      <FundingDetailsStep
        setFundingMaximalRange={setFundingMaximalRange}
        setFundingMinimalRange={setFundingMinimalRange}
        fundingMaximalRange={fundingMaximalRange}
        fundingMinimalRange={fundingMinimalRange}
        cherry={cherry}
        setCherry={setCherry}
        setFundingPeriodLength={setFundingPeriodLength}
        fundingPeriodLength={fundingPeriodLength}
        setFundingPeriodType={setFundingPeriodType}
        fundingPeriodType="limited"
      />
    </MockApolloProvider>
  )
}

export const Default = FundingDetailsTemplate.bind({})
