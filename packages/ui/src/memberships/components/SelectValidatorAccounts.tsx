import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import styled from 'styled-components'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { BaseToggleCheckbox, InputComponent, Label } from '@/common/components/forms'
import { FieldList } from '@/common/components/forms/FieldList'
import { RowInline } from '@/common/components/Modal'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { mapCloneDelete, mapCloneSet } from '@/common/utils'
import { useValidators } from '@/validators/hooks/useValidators'

type SelectValidatorAccountsState = {
  isValidator: boolean
  accounts: Map<number, Account>
}

type Action =
  | { type: 'SetInitialAccounts'; value: Account[] }
  | { type: 'ToggleIsValidator'; value: boolean }
  | { type: 'AddAccount'; value: { index: number; account: Account } }
  | { type: 'RemoveAccount'; value: { index: number } }

const reducer = (state: SelectValidatorAccountsState, action: Action): SelectValidatorAccountsState => {
  switch (action.type) {
    case 'SetInitialAccounts': {
      const accounts = new Map(action.value.map((account, index) => [index, account]))
      return { isValidator: true, accounts }
    }
    case 'ToggleIsValidator': {
      return { ...state, isValidator: action.value }
    }
    case 'AddAccount': {
      const { index, account } = action.value
      return { ...state, accounts: mapCloneSet(state.accounts, index, account) }
    }
    case 'RemoveAccount': {
      const { index } = action.value
      return { ...state, accounts: mapCloneDelete(state.accounts, index) }
    }
  }
}

type UseSelectValidatorAccounts = {
  isValidatorAccount: (account: Account) => boolean
  initialValidatorAccounts?: Account[]
  state: SelectValidatorAccountsState
  onChange: (action: Action) => void
}
export const useSelectValidatorAccounts = (boundAccounts: Account[] = []): UseSelectValidatorAccounts => {
  const [state, dispatch] = useReducer(reducer, { isValidator: false, accounts: new Map() })
  const hasNoBoundAccounts = boundAccounts.length === 0

  const validators = useValidators({ skip: !state.isValidator && hasNoBoundAccounts })
  const validatorAddresses = useMemo(
    () => validators?.flatMap(({ stashAccount: stash, controllerAccount: ctrl }) => (ctrl ? [stash, ctrl] : [stash])),
    [validators]
  )

  const isValidatorAccount = useCallback(
    (account: Account) => !!validatorAddresses?.includes(account.address),
    [validatorAddresses]
  )

  const initialValidatorAccounts = useMemo(
    () => boundAccounts.filter(isValidatorAccount),
    [boundAccounts, validatorAddresses]
  )

  useEffect(() => {
    if (initialValidatorAccounts.length > 0) {
      dispatch({ type: 'SetInitialAccounts', value: initialValidatorAccounts })
    }
  }, [initialValidatorAccounts])

  return { initialValidatorAccounts, state, isValidatorAccount, onChange: dispatch }
}

export const SelectValidatorAccounts = ({
  isValidatorAccount,
  state,
  onChange,
  initialValidatorAccounts,
}: UseSelectValidatorAccounts) => {
  const handleIsValidatorChange = (value: boolean) => onChange({ type: 'ToggleIsValidator', value })
  const selectedAddresses = Array.from(state.accounts.values()).map(({ address }) => address)

  return (
    <>
      <RowInline top={16}>
        <Label>I am a validator: </Label>
        <BaseToggleCheckbox
          trueLabel="Yes"
          falseLabel="No"
          checked={state.isValidator}
          onChange={handleIsValidatorChange}
        />
      </RowInline>

      {initialValidatorAccounts && state.isValidator && (
        <>
          <SelectValidatorAccountWrapper className="validator-accounts">
            <RowInline gap={4}>
              <Label noMargin>Add validator controller account or validator stash account</Label>
              <Tooltip tooltipText="This is the status which indicates the selected account is actually a validator account.">
                <TooltipDefault />
              </Tooltip>
              <TextSmall dark>*</TextSmall>
            </RowInline>

            <TextMedium dark>
              If your validator account is not in your signer wallet, paste the account address to the field below:
            </TextMedium>

            <FieldList
              render={({ index }) => {
                const account = state.accounts.get(index)
                const isInvalid = account && !isValidatorAccount(account)

                return (
                  <InputComponent
                    message={
                      isInvalid
                        ? 'This account is neither a validator controller account nor a validator stash account.'
                        : undefined
                    }
                    validation={isInvalid ? 'invalid' : undefined}
                    inputSize="l"
                  >
                    <SelectAccount
                      selected={account}
                      onChange={(account) => onChange({ type: 'AddAccount', value: { index: index, account } })}
                      filter={(account) => !selectedAddresses.includes(account.address) && isValidatorAccount(account)}
                    />
                  </InputComponent>
                )
              }}
              unmount={({ index }) => onChange({ type: 'RemoveAccount', value: { index } })}
              addLabel="Add Validator Account"
              initialSize={initialValidatorAccounts.length}
              align="end"
            />
          </SelectValidatorAccountWrapper>
        </>
      )}
    </>
  )
}

const SelectValidatorAccountWrapper = styled.div`
  margin-top: -4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
