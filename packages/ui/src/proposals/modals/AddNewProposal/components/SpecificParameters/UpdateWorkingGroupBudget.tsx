import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { CurrencyName } from '@/app/constants/currency'
import { InlineToggleWrap, InputComponent, InputNumber, Label, ToggleCheckbox } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextInlineMedium, TextMedium, TokenValue } from '@/common/components/typography'
import { capitalizeFirstLetter } from '@/common/helpers'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export const UpdateWorkingGroupBudget = () => {
  const { setValue, watch, setError, formState, clearErrors } = useFormContext()
  const [groupId, isPositive, budgetUpdate] = watch([
    'updateWorkingGroupBudget.groupId',
    'updateWorkingGroupBudget.isPositive',
    'updateWorkingGroupBudget.budgetUpdate',
  ])
  const { group } = useWorkingGroup({ name: groupId })

  useEffect(() => {
    if (group) {
      setValue('updateWorkingGroupBudget.budgetUpdate', isPositive ? group.budget?.addn(1) : group.budget?.subn(1), {
        shouldValidate: true,
      })
    }
  }, [group?.id])

  useEffect(() => {
    if (!budgetUpdate || !group || formState.isValidating || !formState.isValid) return

    if (isPositive && budgetUpdate?.lte(group.budget)) {
      return setError('updateWorkingGroupBudget.budgetUpdate', {
        type: 'custom',
        message: 'Amount must be greater then current budget',
      })
    }

    if (!isPositive && budgetUpdate?.gte(group.budget)) {
      return setError('updateWorkingGroupBudget.budgetUpdate', {
        type: 'custom',
        message: 'Amount must be lower then current budget',
      })
    }

    return clearErrors('updateWorkingGroupBudget.budgetUpdate')
  }, [budgetUpdate?.toString(), formState.isValidating, isPositive])

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
              onChange={(selected) =>
                setValue('updateWorkingGroupBudget.groupId', selected.id, { shouldValidate: true })
              }
            />
          </InputComponent>
          {group && (
            <Info>
              <TextMedium>
                Current budget for {capitalizeFirstLetter(group.name)} Working Group is{' '}
                <TextInlineMedium bold>
                  <TokenValue value={group.budget} />
                </TextInlineMedium>
                .
              </TextMedium>
            </Info>
          )}

          <InlineToggleWrap>
            <Label>Decrease budget: </Label>
            <ToggleCheckbox falseLabel="Yes" trueLabel="No" name="updateWorkingGroupBudget.isPositive" />
            <Tooltip tooltipText="Lorem ipsum...">
              <TooltipDefault />
            </Tooltip>
          </InlineToggleWrap>

          <InputComponent
            label="Budget Update"
            tight
            units={CurrencyName.integerValue}
            inputWidth="s"
            tooltipText="Signed amount change in budget. If budget_update is non-negative, then this amount is reduced from the council budget and credited to the group budget, otherwise the reverse."
            required
            name="updateWorkingGroupBudget.budgetUpdate"
            message="Amount must be greater than zero"
            disabled={!group}
          >
            <InputNumber
              id="amount-input"
              name="updateWorkingGroupBudget.budgetUpdate"
              isTokenValue
              isInBN
              placeholder="0"
              disabled={!group}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
