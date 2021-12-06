import { BalanceKind } from '@joystream/types/common'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'

import { InlineToggleWrap, InputComponent, InputNumber, Label, ToggleCheckbox } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextInlineMedium, TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { GroupIdName } from '@/working-groups/types'

export type UpdateKind = keyof typeof BalanceKind.typeDefinitions

export interface UpdateWorkingGroupBudgetParameters {
  budgetUpdate?: BN
  budgetUpdateKind?: UpdateKind
  groupId?: GroupIdName
}

interface UpdateWorkingGroupBudgetProps extends UpdateWorkingGroupBudgetParameters {
  setBudgetUpdate: (amount: BN) => void
  setBudgetUpdateKind: (kind: UpdateKind) => void
  setGroupId(groupId: string): void
}

export const UpdateWorkingGroupBudget = ({
  budgetUpdate,
  setBudgetUpdate,
  setBudgetUpdateKind,
  groupId,
  setGroupId,
}: UpdateWorkingGroupBudgetProps) => {
  const [amount, setAmount] = useNumberInput(0, budgetUpdate)

  const { group } = useWorkingGroup({ name: groupId })

  const [updateKind, setUpdateKind] = useState<UpdateKind>('Positive')

  const isDisabled = !group

  useEffect(() => {
    setBudgetUpdate(new BN(amount))
  }, [amount])

  useEffect(() => {
    setBudgetUpdate(BN_ZERO)
  }, [groupId])

  useEffect(() => {
    setBudgetUpdateKind(updateKind)
  }, [updateKind])

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
            />
          </InputComponent>
          {group && (
            <Info>
              <TextMedium>
                Current budget for {capitalizeFirstLetter(group.name)} Working Group is{' '}
                <TextInlineMedium bold>{formatTokenValue(group.budget)} JOY</TextInlineMedium>.
              </TextMedium>
            </Info>
          )}

          <InlineToggleWrap>
            <Label>Decrease budget: </Label>
            <ToggleCheckbox
              falseLabel="No"
              trueLabel="Yes"
              checked={updateKind === 'Negative'}
              onChange={(isSet) => setUpdateKind(isSet ? 'Positive' : 'Negative')}
            />
            <Tooltip tooltipText="Lorem ipsum...">
              <TooltipDefault />
            </Tooltip>
          </InlineToggleWrap>

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
