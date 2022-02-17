import BN from 'bn.js'
import React from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export interface SetMembershipLeadInvitationParameters {
  amount?: BN
}

interface Props extends SetMembershipLeadInvitationParameters {
  setAmount: (amount: BN) => void
}

const MAX_VALUE = Math.pow(2, 32) - 1

export const SetMembershipLeadInvitationQuota = ({ amount, setAmount }: Props) => {
  const { isLoading, group } = useWorkingGroup({ name: 'membershipWorkingGroup' })

  const setInvitationQuota = (_: any, value: number) => {
    if (Number(value) < MAX_VALUE) {
      setAmount(new BN(value))
    }
  }

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Membership Lead Invitation Quota</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Lead Invitation Quota Amount"
            tight
            units="JOY"
            required
            disabled={isLoading || !group?.leadId}
            message={
              !group?.leadId
                ? "Proposal can't be created because there's no working group lead"
                : 'Amount must be greater than zero'
            }
          >
            <InputNumber
              id="amount-input"
              isTokenValue
              value={amount?.toString()}
              placeholder="0"
              onChange={setInvitationQuota}
              disabled={isLoading || !group?.leadId}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
