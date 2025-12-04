import { isHex } from '@polkadot/util'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { ButtonSecondary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { transactionMachine } from '@/common/model/machines'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { ChangeSessionKeysModalCall } from '.'

export const ChangeSessionKeysModal = () => {
  const { modalData } = useModal<ChangeSessionKeysModalCall>()

  if (!modalData) {
    return null
  }

  return <ChangeSessionKeysModalInner stash={modalData.stash} controller={modalData.controller} />
}

interface ChangeSessionKeysModalInnerProps {
  stash: string
  controller?: string
}

const ChangeSessionKeysModalInner = ({ stash, controller }: ChangeSessionKeysModalInnerProps) => {
  const { hideModal } = useModal<ChangeSessionKeysModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { active: activeMembership } = useMyMemberships()
  const [state, , service] = useMachine(transactionMachine)

  const [proof, setProof] = useState('')

  const transaction = useMemo(() => {
    if (!api || !proof) return undefined

    try {
      if (!isHex(proof)) {
        return undefined
      }

      return api.tx.session.setKeys(proof, new Uint8Array())
    } catch (error) {
      return undefined
    }
  }, [api, proof])

  const stashAccount = useMemo(() => {
    return allAccounts.find((acc) => acc.address === stash)
  }, [allAccounts, stash])

  const controllerAccount = useMemo(() => {
    if (controller) {
      return allAccounts.find((acc) => acc.address === controller)
    }
    if (activeMembership?.controllerAccount) {
      return allAccounts.find((acc) => acc.address === activeMembership.controllerAccount)
    }
    return stashAccount
  }, [activeMembership, allAccounts, controller, stashAccount])

  const signerAccount = useMemo(() => {
    return controllerAccount || allAccounts[0]
  }, [allAccounts, controllerAccount])

  const { isReady, sign, paymentInfo, canAfford } = useSignAndSendTransaction({
    transaction,
    signer: signerAccount?.address ?? '',
    service: service as any,
    skipQueryNode: true,
  })

  if (state.matches('canceled')) {
    return (
      <Modal onClose={hideModal} modalSize="m" modalHeight="m">
        <ModalHeader title="Transaction Canceled" onClick={hideModal} />
        <ModalBody>
          <TextMedium>The transaction was canceled. Please try again if you want to change session keys.</TextMedium>
        </ModalBody>
        <ModalTransactionFooter next={{ onClick: hideModal, label: 'Close' }} />
      </Modal>
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.events}>
        There was a problem with changing session keys
      </FailureModal>
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} text="You have successfully changed your session keys." />
  }

  const signDisabled = !isReady || !canAfford || !isHex(proof)

  return (
    <Modal modalSize="m" modalHeight="m" onClose={hideModal}>
      <ModalHeader title="Change Session Keys" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <AccountSection>
            <AccountLabel>stash account</AccountLabel>
            {stashAccount ? <AccountInfo account={stashAccount} /> : <TextSmall>{encodeAddress(stash)}</TextSmall>}
          </AccountSection>

          <AccountSection>
            <AccountLabel>controller account</AccountLabel>
            {controllerAccount ? (
              <AccountInfo account={controllerAccount} />
            ) : (
              <TextSmall>{controller ? encodeAddress(controller) : '-'}</TextSmall>
            )}
          </AccountSection>

          <InputComponent label="hex from rotate-keys" inputSize="l" id="session-proof">
            <InputText
              id="session-proof"
              placeholder="0x..."
              value={proof}
              onChange={(e) => setProof(e.target.value)}
            />
          </InputComponent>

          {!canAfford && paymentInfo?.partialFee && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> Insufficient funds to cover transaction costs
            </TextSmall>
          )}

          <TextSmall>
            <strong>Warning:</strong> Changing session keys incorrectly can cause your validator to be kicked or
            slashed. Make sure to understand the implications before proceeding.
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee?.toBn()}
        next={{
          disabled: signDisabled,
          label: 'Change Session Keys',
          onClick: sign,
        }}
      >
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
      </ModalTransactionFooter>
    </Modal>
  )
}

const AccountSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border: 1px dashed ${Colors.Black[200]};
  border-radius: 4px;
`

const AccountLabel = styled(TextSmall)`
  text-transform: lowercase;
  color: ${Colors.Black[600]};
  font-weight: 500;
`
