import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextInlineMedium, TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { GroupIdName } from '@/working-groups/types'
import { Info } from '@/common/components/Info'
import { capitalizeFirstLetter } from '@/common/helpers'

export interface UpdateWorkingGroupBudgetParameters {
  budgetUpdate?: BN
  groupId?: GroupIdName
}

interface UpdateWorkingGroupBudgetProps extends UpdateWorkingGroupBudgetParameters {
  setBudgetUpdate: (amount: BN) => void

  setGroupId(groupId: string): void
}

export const UpdateWorkingGroupBudget = ({
  budgetUpdate,
  setBudgetUpdate,
  groupId,
  setGroupId,
}: UpdateWorkingGroupBudgetProps) => {
  const [amount, setAmount] = useNumberInput(0, budgetUpdate)

  const { group } = useWorkingGroup({ name: groupId })

  const isDisabled = !group

  useEffect(() => {
    setBudgetUpdate(new BN(amount))
  }, [amount])
  useEffect(() => {
    setBudgetUpdate(BN_ZERO)
  }, [groupId])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Update Working Group Budget</TextMedium>
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
          {group && (
            <Info>
              <TextMedium>
                Current budget for {capitalizeFirstLetter(group.name)} Working Group is{' '}
                <TextInlineMedium bold>{formatTokenValue(group.budget)} JOY</TextInlineMedium>.
              </TextMedium>
            </Info>
          )}
          <InputComponent
            label="Budget Update"
            tight
            units="JOY"
            inputWidth="s"
            tooltipText="Signed amount change in budget. If budget_update is non-negative, then this amount is reduced from the council budget and credited to the group budget, otherwise the reverse."
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
