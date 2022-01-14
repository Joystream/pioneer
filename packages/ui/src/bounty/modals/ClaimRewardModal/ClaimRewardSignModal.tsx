import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'

interface Props {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  reward: number
}

export const ClaimRewardSignModal = ({ onClose, transaction, service, controllerAccount, reward }: Props) => {
  const { allAccounts } = useMyAccounts()

  const { sign, isReady, paymentInfo } = useSignAndSendTransaction({
    service,
    transaction,
    signer: controllerAccount.address,
  })

  return (
    <TransactionModal onClose={onClose} service={service} title="Claim Reward">
      <ModalBody>
        <TextMedium light>You intend to claim reward <TokenValue value={reward} /></TextMedium>
        <TextMedium light>
          Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be applied to the transaction.
        </TextMedium>

        <InputComponent label="Fee sending from account" inputSize="l">
          <SelectedAccount account={accountOrNamed(allAccounts, controllerAccount.address, 'Account')} />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee.toBn()}
            tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={!isReady} onClick={sign}>
          Claim Reward
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
