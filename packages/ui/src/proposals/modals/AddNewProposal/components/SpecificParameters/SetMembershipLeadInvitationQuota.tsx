import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { cleanInputValue, useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export interface SetMembershipLeadInvitationParameters {
  amount?: BN
}

interface Props extends SetMembershipLeadInvitationParameters {
  setAmount: (amount: BN) => void
}

const MAX_VALUE = Math.pow(2, 32) - 1

export const SetMembershipLeadInvitationQuota = ({ amount: initialAmount, setAmount: setQuota }: Props) => {
  const [amount, setAmount] = useNumberInput(0, initialAmount)
  const { isLoading, group } = useWorkingGroup({ name: 'membershipWorkingGroup' })

  useEffect(() => {
    setQuota(new BN(amount))
  }, [amount])

  const setInvitationQuota = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = cleanInputValue(event.target.value)
    if (Number(value) < MAX_VALUE) {
      setAmount(value)
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
          >
            <InputNumber
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
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
