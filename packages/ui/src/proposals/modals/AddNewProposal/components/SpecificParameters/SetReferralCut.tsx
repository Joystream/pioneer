import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

export const SetReferralCut = () => {
  const { api } = useApi()
  const maximumReferralCut = api?.consts.members.referralCutMaximumPercent
  const membershipPrice = useFirstObservableValue(() => api?.query.members.membershipPrice(), [api?.isConnected])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>
            Set referral cut as % from price of creating new membership, currently set as{' '}
            <TokenValue value={membershipPrice ?? null} />
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Referral Cut"
            tight
            units="%"
            message={`Enter value below ${maximumReferralCut ? maximumReferralCut.toNumber() + 1 : 100}%`}
            name="setReferralCut.referralCut"
            required
            tooltipText="When purchasing a membership, another member, called a reference, can be referenced, resulting in a portion of the burned funds being credited to the reference. This portion is a mutable parameter denoted as referral_cut and defined as the membership fee percentage. Currently, there is a limit of 50% for the referral cut."
            tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/memberships#buying-a-membership"
            tooltipLinkText="Learn more"
          >
            <InputNumber
              id="amount-input"
              name="setReferralCut.referralCut"
              placeholder="0"
              maxAllowedValue={Math.pow(2, 8)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
