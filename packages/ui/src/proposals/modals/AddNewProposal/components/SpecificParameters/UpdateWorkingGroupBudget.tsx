import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { InlineToggleWrap, InputComponent, Label, ToggleCheckbox, TokenInput } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { formatDurationDate } from '@/common/components/statistics'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextInlineMedium, TextMedium, TokenValue } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { nameMapping } from '@/common/helpers'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { formatTokenValue, MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { useCouncilStatistics } from '@/council/hooks/useCouncilStatistics'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

export const UpdateWorkingGroupBudget = () => {
  const { setValue, watch, setError, formState, clearErrors } = useFormContext()
  const { api } = useApi()
  const { budget, reward } = useCouncilStatistics()
  const nextPaymentBlock = useFirstObservableValue(() => api?.query.council.nextRewardPayments(), [api?.isConnected])
  const [groupId, isPositive, budgetUpdate] = watch([
    'updateWorkingGroupBudget.groupId',
    'updateWorkingGroupBudget.isPositive',
    'updateWorkingGroupBudget.budgetUpdate',
  ])
  const currentBlock = useCurrentBlockNumber()
  const { group } = useWorkingGroup({ name: groupId })

  const milisecondsLeft = useMemo(() => {
    if (currentBlock && nextPaymentBlock) {
      return (Number(nextPaymentBlock) - currentBlock.toNumber()) * MILLISECONDS_PER_BLOCK
    }
  }, [currentBlock, nextPaymentBlock])

  useEffect(() => {
    if (group) {
      setValue('updateWorkingGroupBudget.budgetUpdate', isPositive ? group.budget?.addn(1) : group.budget?.subn(1), {
        shouldValidate: true,
      })
    }
  }, [group?.id])

  useEffect(() => {
    if (!budgetUpdate || !budget.amount || !group || formState.isValidating || !formState.isValid) return

    if (isPositive && budgetUpdate?.gte(budget.amount)) {
      return setError('updateWorkingGroupBudget.budgetUpdate', {
        type: 'execution',
        message:
          'Unless the Councils budget is increased between now and attempted execution, this proposal will fail to execute, and the budget size will not be changed.',
      })
    }

    if (!isPositive && budgetUpdate?.gte(group.budget)) {
      return setError('updateWorkingGroupBudget.budgetUpdate', {
        type: 'execution',
        message:
          'Unless the budget is increased between now and attempted execution, this proposal will fail to execute, and the budget size will not be changed',
      })
    }

    return clearErrors('updateWorkingGroupBudget.budgetUpdate')
  }, [budgetUpdate?.toString(), budget.amount?.toString(), formState.isValidating, isPositive])

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
                Current budget for {nameMapping(group.name)} Working Group is{' '}
                <TextInlineMedium bold>
                  <TokenValue value={group.budget} />
                </TextInlineMedium>
                .
              </TextMedium>
            </Info>
          )}
          {budget.amount && (
            <Info>
              <TextMedium>
                Current budget for Council is{' '}
                <TextInlineMedium bold>
                  <TokenValue value={budget.amount} />
                </TextInlineMedium>
                .
              </TextMedium>
            </Info>
          )}
          {nextPaymentBlock && !!milisecondsLeft && (
            <Info>
              <TextMedium>
                Next Council payment is in <DurationValue value={formatDurationDate(milisecondsLeft)} /> at block number{' '}
                <TextInlineMedium bold>{formatTokenValue(nextPaymentBlock as BN)}</TextInlineMedium>. With amount{' '}
                <TokenValue value={reward.amount} />. Expected payouts can be impacted by hiring and firing decisions
                made before the date of payout.
              </TextMedium>
            </Info>
          )}
          <Info>
            <TextMedium>
              {isPositive
                ? 'If the Councils budget is less than provided amount at attempted execution, this proposal will fail to execute, and the budget size will not be changed.'
                : 'If the budget is less than provided amount at attempted execution, this proposal will fail to execute and the budget size will not be changed'}
            </TextMedium>
          </Info>

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
            <TokenInput
              id="amount-input"
              name="updateWorkingGroupBudget.budgetUpdate"
              placeholder="0"
              disabled={!group}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
