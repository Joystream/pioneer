import React, { useMemo, useState } from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { isValidAddress } from '@/accounts/model/isValidAddress'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'

import { PayoutModalCall } from '@/validators/modals/PayoutModal/types'

import { payoutMachine } from './machine'

export const PayoutModal = () => {
  const { hideModal, modalData } = useModal<PayoutModalCall>()
  const { api } = useApi()
  const [state, send, service] = useMachine(payoutMachine)

  const [signerAccount, setSignerAccount] = useState<Account | undefined>()
  const [validatorAddress, setValidatorAddress] = useState(modalData?.validatorAddress || '')
  const [era, setEra] = useState('')

  const canPayout = useMemo(() => {
    if (!signerAccount || !validatorAddress || !era) {
      return false
    }
    if (!isValidAddress(validatorAddress)) {
      return false
    }
    const eraNum = parseInt(era)
    if (isNaN(eraNum) || eraNum < 0) {
      return false
    }
    return true
  }, [signerAccount, validatorAddress, era])

  const transaction = useMemo(() => {
    if (!api || !signerAccount || !validatorAddress || !era || !canPayout) {
      return undefined
    }
    const eraNum = parseInt(era)
    // api.tx.staking.payoutStakers(validator_stash, era)
    // This pays out rewards for a validator for a specific era
    return api.tx.staking.payoutStakers(validatorAddress, eraNum)
  }, [api, signerAccount, validatorAddress, era, canPayout])

  const onSubmit = () => {
    if (canPayout) {
      send('NEXT')
    }
  }

  if (state.matches('transaction') && transaction && signerAccount) {
    return (
      <SignTransactionModal
        transaction={transaction}
        signer={signerAccount.address}
        service={service}
        buttonText="Sign and Claim"
      >
        <RowGapBlock gap={16}>
          <TextMedium>
            You are claiming staking rewards for era {era} from validator. This will distribute rewards 
            to the validator and all nominators for that era.
          </TextMedium>
          <TextMedium>
            <strong>Validator:</strong> {validatorAddress}
          </TextMedium>
          <TextMedium>
            <strong>Era:</strong> {era}
          </TextMedium>
          <TextMedium>
            <strong>Signer:</strong> {signerAccount.address}
          </TextMedium>
          <TextMedium lighter>
            Note: Anyone can trigger a payout for any validator. The rewards will be distributed to the 
            appropriate accounts automatically.
          </TextMedium>
        </RowGapBlock>
      </SignTransactionModal>
    )
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Claim Staking Rewards" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={24}>
          <TextMedium>
            Claim staking rewards for a validator from a specific era. This will distribute rewards to the 
            validator and all nominators who backed them in that era.
          </TextMedium>

          <InputComponent label="Signer Account" required inputSize="l">
            <SelectAccount
              selected={signerAccount}
              onChange={setSignerAccount}
            />
          </InputComponent>

          <InputComponent label="Validator Address" required inputSize="l">
            <InputText
              value={validatorAddress}
              onChange={(e) => setValidatorAddress(e.target.value)}
              placeholder="Enter validator address"
            />
          </InputComponent>

          <InputComponent label="Era Number" required inputSize="l">
            <InputText
              value={era}
              onChange={(e) => setEra(e.target.value)}
              placeholder="Enter era number (e.g., 100)"
              type="number"
            />
            <TextMedium lighter>
              Enter the era number for which you want to claim rewards. You can find unclaimed eras on the validator details.
            </TextMedium>
          </InputComponent>

          {validatorAddress && !isValidAddress(validatorAddress) && (
            <TextMedium lighter>Invalid validator address</TextMedium>
          )}
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onSubmit} disabled={!canPayout}>
          Next: Sign Transaction
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
