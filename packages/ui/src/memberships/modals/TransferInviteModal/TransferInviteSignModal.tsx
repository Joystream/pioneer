import BN from 'bn.js'
import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalTransactionFooter, SignTransferContainer } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'

import { Member } from '../../types'

interface Props {
  onClose: () => void
  sourceMember: Member
  targetMember: Member
  amount: BN
  service: ActorRef<any>
}

export const TransferInviteSignModal = ({ onClose, sourceMember, targetMember, amount, service }: Props) => {
  const { api, connectionState } = useApi()
  const { allAccounts } = useMyAccounts()
  const transaction = useMemo(
    () => api?.tx?.members?.transferInvites(sourceMember.id, targetMember.id, amount),
    [sourceMember.id, targetMember.id, amount, connectionState]
  )
  const signerAddress = sourceMember.controllerAccount
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: signerAddress,
    service,
  })
  const plural = amount.gt(new BN(1))
  const handle = targetMember.handle
  const fee = paymentInfo?.partialFee.toBn()
  return (
    <TransactionModal service={service} onClose={onClose}>
      <ModalBody>
        <SignTransferContainer>
          <TextMedium margin="m">
            You intend to transfer {amount.toString()} invite{plural && 's'} to {handle}. Fee of{' '}
            <TokenValue value={fee} /> will be applied to the transaction.
          </TextMedium>
          <InputComponent required inputSize="l" label="Fee paid by account" disabled borderless>
            <SelectedAccount
              account={accountOrNamed(allAccounts, sourceMember.controllerAccount, 'Controller Account')}
            />
          </InputComponent>
        </SignTransferContainer>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={fee}
        next={{ disabled: !isReady, label: 'Sign and Send', onClick: sign }}
      />
    </TransactionModal>
  )
}
