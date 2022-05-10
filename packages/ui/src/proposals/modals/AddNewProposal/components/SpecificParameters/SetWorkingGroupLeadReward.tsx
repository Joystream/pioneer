import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMember } from '@/memberships/hooks/useMembership'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { GroupIdName } from '@/working-groups/types'

export interface SetWorkingGroupLeadRewardParameters {
  rewardPerBlock?: BN
  groupId?: GroupIdName
  workerId?: number
}

interface SetWorkingGroupLeadRewardProps extends SetWorkingGroupLeadRewardParameters {
  setRewardPerBlock: (amount: BN) => void
  setGroupId(groupId: string): void
  setWorkerId(workerId?: number): void
}

export const SetWorkingGroupLeadReward = ({
  rewardPerBlock,
  groupId,
  setRewardPerBlock,
  setGroupId,
  setWorkerId,
}: SetWorkingGroupLeadRewardProps) => {
  const { group } = useWorkingGroup({ name: groupId })
  const { member: lead } = useMember(group?.leadId)

  const isDisabled = !group || (group && !group.leadId)

  useEffect(() => {
    setWorkerId(group?.leadWorker?.runtimeId)
  }, [groupId, group?.leadWorker?.runtimeId])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Working Group Lead Reward</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            id="working-group-input"
            label="Working Group"
            required
            inputSize="l"
            tooltipText="Please select an identifier for Working Group"
          >
            <SelectWorkingGroup
              id="working-group"
              selectedGroupId={groupId}
              onChange={(selected) => setGroupId(selected.id)}
              disableNoLead
            />
          </InputComponent>
          <SelectedMember label="Working Group Lead" member={lead} disabled />
          {group && (
            <Info>
              <TextMedium>
                Current reward per block for {group?.name} Working Group Lead is{' '}
                {<TokenValue value={group?.leadWorker?.rewardPerBlock} />}
              </TextMedium>
            </Info>
          )}

          <InputComponent
            label="Reward Amount Per Block"
            tight
            units="tJOY"
            inputWidth="s"
            tooltipText="Reward per block amount that is awarded to working group lead’s reward account"
            message="Amount must be greater than zero"
            required
            disabled={isDisabled}
          >
            <InputNumber
              id="amount-input"
              isTokenValue
              value={rewardPerBlock?.toString()}
              placeholder="0"
              onChange={(_, value) => setRewardPerBlock(new BN(value))}
              disabled={isDisabled}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
