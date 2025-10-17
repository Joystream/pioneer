import BN from 'bn.js'
import React, { useMemo, useState } from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
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

import { BondModalCall } from '@/validators/modals/BondModal/types'

import { bondMachine } from './machine'

export const BondModal = () => {
  const { hideModal } = useModal<BondModalCall>()
  const { api } = useApi()
  const [state, send, service] = useMachine(bondMachine)

  const [stashAccount, setStashAccount] = useState<Account | undefined>()
  const [controllerAccount, setControllerAccount] = useState<Account | undefined>()
  const [amount, setAmount] = useState<BN>(BN_ZERO)

  const stashBalance = useBalance(stashAccount?.address)
  // Min bond is 1 JOY for development, check if constant exists
  const minBond = BN_ZERO

  const canBond = useMemo(() => {
    if (!stashAccount || !controllerAccount || !amount || amount.lte(BN_ZERO)) {
      return false
    }
    if (amount.lt(minBond)) {
      return false
    }
    if (stashBalance && stashBalance.transferable.lt(amount)) {
      return false
    }
    return true
  }, [stashAccount, controllerAccount, amount, minBond, stashBalance])

  const transaction = useMemo(() => {
    if (!api || !stashAccount || !controllerAccount || !amount || amount.lte(BN_ZERO)) {
      return undefined
    }
    // api.tx.staking.bond(controller, value, payee)
    // payee: 'Staked' keeps rewards in staking, 'Stash' pays to stash account
    return api.tx.staking.bond(controllerAccount.address, amount, 'Staked')
  }, [api, stashAccount, controllerAccount, amount])

  const onSubmit = () => {
    if (canBond) {
      send('NEXT')
    }
  }

  if (state.matches('transaction') && transaction && stashAccount) {
    return (
      <SignTransactionModal
        transaction={transaction}
        signer={stashAccount.address}
        service={service}
        buttonText="Sign and Bond"
      >
        <RowGapBlock gap={16}>
          <TextMedium>
            You are bonding <TokenValue value={amount} /> tokens. These tokens will be locked for staking and 
            you can nominate validators to earn rewards.
          </TextMedium>
          <TextMedium>
            <strong>Stash Account:</strong> {stashAccount.address}
          </TextMedium>
          <TextMedium>
            <strong>Controller Account:</strong> {controllerAccount?.address}
          </TextMedium>
          <TextMedium>
            <strong>Rewards:</strong> Will be added to bonded amount (Staked)
          </TextMedium>
        </RowGapBlock>
      </SignTransactionModal>
    )
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Bond Tokens" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={24}>
          <TextMedium>
            Bond tokens to participate in staking. You'll be able to nominate validators to earn rewards. 
            The controller account will be able to manage nominations.
          </TextMedium>

          <InputComponent label="Stash Account" required inputSize="l">
            <SelectAccount
              selected={stashAccount}
              onChange={setStashAccount}
            />
          </InputComponent>

          <InputComponent label="Controller Account" required inputSize="l">
            <SelectAccount
              selected={controllerAccount}
              onChange={setControllerAccount}
            />
          </InputComponent>

          <InputComponent label="Amount to Bond" required inputSize="l">
            <TokenInput
              value={amount}
              onChange={(_, value) => setAmount(value)}
              placeholder="0"
            />
            {stashBalance && (
              <TextMedium>
                Available: <TokenValue value={stashBalance.transferable} />
              </TextMedium>
            )}
            <TextMedium>
              Minimum bond: <TokenValue value={minBond} />
            </TextMedium>
          </InputComponent>

          {!canBond && amount.gt(BN_ZERO) && (
            <TextMedium lighter>
              {amount.lt(minBond) && `Amount must be at least ${minBond.toString()}`}
              {stashBalance && stashBalance.transferable.lt(amount) && 'Insufficient balance'}
            </TextMedium>
          )}
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onSubmit} disabled={!canBond}>
          Next: Sign Transaction
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
