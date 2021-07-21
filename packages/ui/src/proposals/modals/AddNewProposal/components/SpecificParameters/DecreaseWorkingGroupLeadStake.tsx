import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { AmountButton, AmountButtons, Row, TransactionAmount } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextInlineMedium, TextMedium } from '@/common/components/typography'
import { capitalizeFirstLetter } from '@/common/helpers'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { SelectMember } from '@/memberships/components/SelectMember'
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

  const { group, isLoading } = useWorkingGroup({ name: groupId })
  const { member: leader } = useMember(group?.leaderId)

  const byHalf = () => setAmount(group && group.leaderWorker ? group.leaderWorker.stake.divn(2).toString() : '')
  const byThird = () => setAmount(group && group.leaderWorker ? group.leaderWorker.stake.divn(3).toString() : '')

  const isDisabled = !groupId || isLoading || (group && !group.leaderId)

  useEffect(() => setStakingAmount(new BN(amount)), [amount])
  useEffect(() => setWorkerId(group?.leaderWorker?.runtimeId), [groupId, group?.leaderWorker?.runtimeId])

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
            <SelectWorkingGroup selectedGroupId={groupId} onChange={(selected) => setGroupId(selected.id)} />
          </InputComponent>
          {groupId && group && !group.leaderId && (
            <Info title="Warning">
              <TextMedium>
                {capitalizeFirstLetter(group.name)} Working Group has no any Leader yet. Please choose other Group.
              </TextMedium>
            </Info>
          )}
          <InputComponent label="Working Group Leader" inputSize="l" disabled>
            <SelectMember onChange={() => true} disabled selected={leader} />
          </InputComponent>
          {group && group.leaderWorker && (
            <Info>
              <TextMedium>
                The actual stake for {capitalizeFirstLetter(group.name)} Working Group Lead is{' '}
                <TextInlineMedium bold>{formatTokenValue(group.leaderWorker?.stake)} JOY</TextInlineMedium>.
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
