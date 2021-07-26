import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { SelectMember } from '@/memberships/components/SelectMember'
import { useMember } from '@/memberships/hooks/useMembership'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export interface SlashWorkingGroupLeadParameters {
  slashingAmount?: BN
  groupId?: string
  workerId?: number
}

interface SlashWorkingGroupLeadProps extends SlashWorkingGroupLeadParameters {
  setSlashingAmount: (amount: BN) => void

  setGroupId(groupId: string): void

  setWorkerId(workerId?: number): void
}

export const SlashWorkingGroupLead = ({
  slashingAmount,
  groupId,
  setSlashingAmount,
  setGroupId,
  setWorkerId,
}: SlashWorkingGroupLeadProps) => {
  const [amount, setAmount] = useNumberInput(0, slashingAmount)

  const { group } = useWorkingGroup({ name: groupId })
  const { member: leader } = useMember(group?.leaderId)

  const isDisabled = !group || (group && !group.leaderId)

  useEffect(() => setSlashingAmount(new BN(amount)), [amount])
  useEffect(() => {
    setSlashingAmount(BN_ZERO)
    setWorkerId(group?.leaderWorker?.runtimeId)
  }, [groupId, group?.leaderWorker?.runtimeId])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Slash Working Group Lead</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Working Group"
            required
            inputSize="l"
            tooltipText="Please select an identifier for Working Group"
          >
            <SelectWorkingGroup selectedGroupId={groupId} onChange={(selected) => setGroupId(selected.id)} />
          </InputComponent>
          <InputComponent label="Working Group Leader" inputSize="l" disabled>
            <SelectMember onChange={() => true} disabled selected={leader} />
          </InputComponent>
          <InputComponent
            label="Slashing Amount"
            tight
            units="JOY"
            inputWidth="s"
            tooltipText="Amount to be slashed"
            required
            disabled={isDisabled}
          >
            <InputNumber
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
              placeholder="0"
              onChange={(event) => setAmount(event.target.value)}
              disabled={isDisabled}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
