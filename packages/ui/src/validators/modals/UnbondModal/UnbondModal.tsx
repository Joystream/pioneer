import BN from 'bn.js'
import React, { useMemo, useState } from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, TokenInput } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { useBondedAccounts } from '@/validators/hooks/useBondedAccounts'
import { UnbondModalCall } from '@/validators/modals/UnbondModal/types'

import { unbondMachine } from './machine'

export const UnbondModal = () => {
  const { hideModal } = useModal<UnbondModalCall>()
  const { api } = useApi()
  const [state, send, service] = useMachine(unbondMachine)
  const { bondedAccounts, isLoading } = useBondedAccounts()

  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>()
  const [amount, setAmount] = useState<BN>(BN_ZERO)

  const bondedInfo = bondedAccounts.find(acc => acc.address === selectedAccount?.address)
  const maxUnbond = bondedInfo ? new BN(bondedInfo.bondedAmount) : BN_ZERO

  const canUnbond = useMemo(() => {
    if (!selectedAccount || !amount || amount.lte(BN_ZERO)) {
      return false
    }
    if (amount.gt(maxUnbond)) {
      return false
    }
    return true
  }, [selectedAccount, amount, maxUnbond])

  const transaction = useMemo(() => {
    if (!api || !selectedAccount || !amount || amount.lte(BN_ZERO)) {
      return undefined
    }
    // api.tx.staking.unbond(value) - unbonds the specified amount
    return api.tx.staking.unbond(amount)
  }, [api, selectedAccount, amount])

  const onSubmit = () => {
    if (canUnbond) {
      send('NEXT')
    }
  }

  if (state.matches('transaction') && transaction && selectedAccount) {
    return (
      <SignTransactionModal
        transaction={transaction}
        signer={selectedAccount.address}
        service={service}
        buttonText="Sign and Unbond"
      >
        <RowGapBlock gap={16}>
          <TextMedium>
            You are unbonding <TokenValue value={amount} /> tokens. These tokens will enter an unbonding 
            period and will be available for withdrawal after the unbonding duration.
          </TextMedium>
          <TextMedium>
            <strong>Account:</strong> {selectedAccount.address}
          </TextMedium>
          <TextMedium>
            <strong>Currently Bonded:</strong> <TokenValue value={maxUnbond} />
          </TextMedium>
          <TextMedium lighter>
            Note: After unbonding, you must wait for the unbonding period to complete before withdrawing.
          </TextMedium>
        </RowGapBlock>
      </SignTransactionModal>
    )
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Unbond Tokens" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={24}>
          <TextMedium>
            Unbond tokens from staking. The tokens will enter an unbonding period and become available 
            for withdrawal after the unbonding duration completes.
          </TextMedium>

          {isLoading ? (
            <TextMedium>Loading bonded accounts...</TextMedium>
          ) : bondedAccounts.length === 0 ? (
            <TextMedium>No bonded accounts found. You need to bond tokens first.</TextMedium>
          ) : (
            <>
              <InputComponent label="Select Bonded Account" required inputSize="l">
                <SelectAccount
                  selected={selectedAccount}
                  onChange={setSelectedAccount}
                  filter={(account) => bondedAccounts.some(ba => ba.address === account.address)}
                />
              </InputComponent>

              {selectedAccount && (
                <>
                  <TextMedium>
                    <strong>Currently Bonded:</strong> <TokenValue value={maxUnbond} />
                  </TextMedium>

                  <InputComponent label="Amount to Unbond" required inputSize="l">
                    <TokenInput
                      value={amount}
                      onChange={(_, value) => setAmount(value)}
                      placeholder="0"
                      maxAllowedValue={maxUnbond}
                    />
                    <TextMedium lighter>
                      Maximum: <TokenValue value={maxUnbond} />
                    </TextMedium>
                  </InputComponent>
                </>
              )}

              {!canUnbond && amount.gt(BN_ZERO) && (
                <TextMedium lighter>
                  {amount.gt(maxUnbond) && 'Amount exceeds bonded balance'}
                </TextMedium>
              )}
            </>
          )}
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onSubmit} disabled={!canUnbond || bondedAccounts.length === 0}>
          Next: Sign Transaction
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
