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

export const SetMembershipLeadInvitationQuota = () => {
  const { isLoading, group } = useWorkingGroup({ name: 'membershipWorkingGroup' })

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
            units="tJOY"
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
              name="setMembershipLeadInvitationQuota.amount"
              isTokenValue
              isInBN
              placeholder="0"
              disabled={isLoading || !group?.leadId}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
