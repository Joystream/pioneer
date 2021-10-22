import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { AmountButton, AmountButtons, Row, TransactionAmount } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextInlineMedium, TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMember } from '@/memberships/hooks/useMembership'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export interface DecreaseWorkingGroupLeadStakeParameters {
  stakingAmount?: BN
  groupId?: string
  workerId?: number
}

interface DecreaseWorkingGroupLeadStakeProps extends DecreaseWorkingGroupLeadStakeParameters {
  setStakingAmount: (amount: BN) => void

  setGroupId(groupId: string): void

  setWorkerId(workerId?: number): void
}

export const DecreaseWorkingGroupLeadStake = ({
  stakingAmount,
  groupId,
  setStakingAmount,
  setGroupId,
  setWorkerId,
}: DecreaseWorkingGroupLeadStakeProps) => {
  const [amount, setAmount] = useNumberInput(0, stakingAmount)

  const { group } = useWorkingGroup({ name: groupId })
  const { member: lead } = useMember(group?.leadId)

  const byHalf = () => setAmount(group && group.leadWorker ? group.leadWorker.stake.divn(2).toString() : '')
  const byThird = () => setAmount(group && group.leadWorker ? group.leadWorker.stake.divn(3).toString() : '')

  const isDisabled = !group || (group && !group.leadId)

  useEffect(() => setStakingAmount(new BN(amount)), [amount])
  useEffect(() => {
    setStakingAmount(BN_ZERO)
    setWorkerId(group?.leadWorker?.runtimeId)
  }, [groupId, group?.leadWorker?.runtimeId])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Decrease Working Group Lead Stake</TextMedium>
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
            <SelectWorkingGroup
              selectedGroupId={groupId}
              onChange={(selected) => setGroupId(selected.id)}
              disableNoLead
            />
          </InputComponent>
          <SelectedMember label="Working Group Lead" member={lead} disabled />
          {group && (
            <Info>
              <TextMedium>
                The actual stake for {capitalizeFirstLetter(group.name)} Working Group Lead is{' '}
                <TextInlineMedium bold>{formatTokenValue(group.leadWorker?.stake)} JOY</TextInlineMedium>.
              </TextMedium>
            </Info>
          )}
          <TransactionAmount>
            <InputComponent
              label="Decrease Stake Amount"
              tight
              units="JOY"
              inputWidth="s"
              tooltipText="Amount by which to decrease stake."
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
            <AmountButtons>
              <AmountButton size="small" onClick={byHalf} disabled={isDisabled}>
                By half
              </AmountButton>
              <AmountButton size="small" onClick={byThird} disabled={isDisabled}>
                By 1/3
              </AmountButton>
            </AmountButtons>
          </TransactionAmount>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
