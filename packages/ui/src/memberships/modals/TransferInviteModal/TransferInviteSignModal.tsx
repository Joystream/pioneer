import BN from 'bn.js'
import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalFooter, SignTransferContainer, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TransactionModal } from '@/common/components/TransactionModal'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { formatTokenValue } from '@/common/model/formatters'

import { Member } from '../../types'

interface Props {
  onClose: () => void
  sourceMember: Member
  targetMember: Member
  amount: BN
  service: ActorRef<any>
}

export const TransferInviteSignModal = ({ onClose, sourceMember, targetMember, amount, service }: Props) => {
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const transaction = useMemo(() => api.tx?.members?.transferInvites(sourceMember.id, targetMember.id, amount), [
    sourceMember.id,
    targetMember.id,
    amount,
  ])
  const signerAddress = sourceMember.controllerAccount
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: signerAddress,
    service,
  })
  const plural = amount.gt(new BN(1))
  const name = targetMember.name
  const fee = paymentInfo?.partialFee.toBn()

  return (
    <TransactionModal service={service} onClose={onClose}>
      <ModalBody>
        <SignTransferContainer>
          <TextMedium margin="m">
            You intend to transfer {amount.toString()} invite{plural && 's'} to {name}. A fee of {formatTokenValue(fee)}{' '}
            JOY will be applied to the transaction.
          </TextMedium>
          <InputComponent required inputSize="l" label="Fee paid by account" disabled borderless>
            <SelectedAccount
              account={accountOrNamed(allAccounts, sourceMember.controllerAccount, 'Controller Account')}
            />
          </InputComponent>
        </SignTransferContainer>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Transaction fee:"
            value={fee}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={sign} disabled={!isReady}>
          Sign and Send
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
