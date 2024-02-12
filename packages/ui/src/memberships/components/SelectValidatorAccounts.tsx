import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import styled from 'styled-components'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { BaseToggleCheckbox, InputComponent, Label } from '@/common/components/forms'
import { CrossIcon, PlusIcon } from '@/common/components/icons'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { Row, RowInline } from '@/common/components/Modal'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { toSpliced } from '@/common/model/Polyfill'
import { useValidators } from '@/validators/hooks/useValidators'

type SelectValidatorAccountsState = {
  isValidator: boolean
  accounts: (Account | undefined)[]
}

type Action =
  | { type: 'SetInitialAccounts'; value: Account[] }
  | { type: 'ToggleIsValidator'; value: boolean }
  | { type: 'AddAccount'; value: { index: number; account?: Account } }
  | { type: 'RemoveAccount'; value: { index: number } }

const reducer = (state: SelectValidatorAccountsState, action: Action): SelectValidatorAccountsState => {
  switch (action.type) {
    case 'SetInitialAccounts': {
      return { isValidator: true, accounts: action.value }
    }
    case 'ToggleIsValidator': {
      return { ...state, isValidator: action.value }
    }
    case 'AddAccount': {
      const { index, account } = action.value
      return { ...state, accounts: toSpliced(state.accounts, index, 1, account) }
    }
    case 'RemoveAccount': {
      const { index } = action.value
      return { ...state, accounts: toSpliced(state.accounts, index, 1) }
    }
  }
}

type UseSelectValidatorAccounts = {
  isValidatorAccount: (account: Account) => boolean
  initialValidatorAccounts: Account[]
  state: SelectValidatorAccountsState
  onChange: (action: Action) => void
}
export const useSelectValidatorAccounts = (boundAccounts: Account[] = []): UseSelectValidatorAccounts => {
  const [state, dispatch] = useReducer(reducer, { isValidator: false, accounts: [] })

  const validators = useValidators({ skip: !state.isValidator && boundAccounts.length === 0 })
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

export const SelectValidatorAccounts = ({ isValidatorAccount, state, onChange }: UseSelectValidatorAccounts) => {
  const handleIsValidatorChange = (value: boolean) => onChange({ type: 'ToggleIsValidator', value })

  const AddAccount = (index: number, account: Account | undefined) =>
    onChange({ type: 'AddAccount', value: { index, account } })
  const RemoveAccount = (index: number) => onChange({ type: 'RemoveAccount', value: { index } })

  const validatorAccountSelectorFilter = (index: number, account: Account) =>
    toSpliced(state.accounts, index, 1).every(
      (accountOrUndefined) => accountOrUndefined?.address !== account.address
    ) && isValidatorAccount(account)

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

      {state.isValidator && (
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
            {state.accounts.map((account, index) => (
              <Row>
                <RowInline>
                  <InputComponent inputSize="l">
                    <SelectAccount
                      selected={account}
                      onChange={(account) => AddAccount(index, account)}
                      filter={(account) => validatorAccountSelectorFilter(index, account)}
                    />
                  </InputComponent>
                  <ButtonGhost
                    square
                    size="large"
                    onClick={() => {
                      RemoveAccount(index)
                    }}
                  >
                    <CrossIcon />
                  </ButtonGhost>
                </RowInline>
                {account && !isValidatorAccount(account) && (
                  <RowInline gap={2}>
                    <TextSmall error>
                      <InputNotificationIcon>
                        <AlertSymbol />
                      </InputNotificationIcon>
                    </TextSmall>
                    <TextSmall error>
                      This account is neither a validator controller account nor a validator stash account.
                    </TextSmall>
                  </RowInline>
                )}
              </Row>
            ))}
            <RowInline justify="end">
              <ButtonPrimary
                size="small"
                className="add-button"
                onClick={() => AddAccount(state.accounts.length, undefined)}
              >
                <PlusIcon /> Add Validator Account
              </ButtonPrimary>
            </RowInline>
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

const InputNotificationIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  color: inherit;
  padding-right: 2px;

  .blackPart,
  .primaryPart {
    fill: currentColor;
  }
`
