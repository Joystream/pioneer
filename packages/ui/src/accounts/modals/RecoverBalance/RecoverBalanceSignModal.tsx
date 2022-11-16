import { SubmittableExtrinsic } from '@polkadot/api/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { AccountLockInfo, lockInfoLayout } from '@/accounts/components/AccountLockInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { RecoverableLock, RecoverBalanceModalCall } from '@/accounts/modals/RecoverBalance/index'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { InputComponent } from '@/common/components/forms'
import { EmptyListHeader, ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { ModalBody, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'

interface Props {
  onClose: () => void
  service: ActorRef<any>
  transaction: SubmittableExtrinsic<'rxjs'>
  address: Address
  signer: Address
  lock: RecoverableLock
}

export const RecoverBalanceSignModal = ({ onClose, service, transaction, address, signer, lock }: Props) => {
  const { modalData } = useModal<RecoverBalanceModalCall>()
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: signer,
    service,
  })
  const { allAccounts } = useMyAccounts()
  const recoverAccount = accountOrNamed(allAccounts, address, 'Recover account')

  return (
    <TransactionModal
      service={service}
      onClose={onClose}
      title={modalData.isWithdrawing ? 'Withdraw Application' : 'Recover Stake'}
    >
      <ModalBody>
        <TextMedium>
          You intend to recover <TokenValue value={lock.amount} /> stake.
        </TextMedium>
        <RowGapBlock gap={8}>
          <ListHeaders $colLayout={lockInfoLayout}>
            <EmptyListHeader />
            <ListHeader>Unlocking</ListHeader>
            <ListHeader>Recoverable stake</ListHeader>
          </ListHeaders>
          <InputComponent inputSize="l" disabled>
            <AccountLockInfo account={recoverAccount} amount={lock.amount} lockType={lock.type} />
          </InputComponent>
        </RowGapBlock>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee?.toBn()}
        next={{ disabled: !isReady, label: 'Sign transaction and Transfer', onClick: sign }}
      />
    </TransactionModal>
  )
}
