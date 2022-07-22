import BN from 'bn.js'
import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { ForumThreadWithDetails } from '@/forum/types'
import { useMember } from '@/memberships/hooks/useMembership'

interface EditThreadTitleSignModalProps {
  thread: ForumThreadWithDetails
  newTitle: string
  service: ActorRef<any>
  onClose: () => void
}

export const EditThreadTitleSignModal = ({ thread, newTitle, service, onClose }: EditThreadTitleSignModalProps) => {
  const { api, connectionState } = useApi()
  const { member: threadAuthor } = useMember(thread.authorId)
  const { allAccounts: myAccounts } = useMyAccounts()

  const transaction = useMemo(() => {
    if (threadAuthor && connectionState === 'connected' && api) {
      return api.tx.forum.editThreadMetadata(threadAuthor.id, thread.categoryId, thread.id, newTitle)
    }
  }, [newTitle, threadAuthor, connectionState])

  const controllerAccount = accountOrNamed(myAccounts, threadAuthor?.controllerAccount as string, 'Controller Account')

  const { isReady, paymentInfo, sign } = useSignAndSendTransaction({
    transaction,
    signer: controllerAccount.address,
    service,
  })
  const balance = useBalance(controllerAccount.address)

  const hasFunds = useMemo(() => {
    if (balance?.transferable && paymentInfo?.partialFee) {
      return balance.transferable.gte(paymentInfo.partialFee)
    }
    return false
  }, [controllerAccount.address, balance?.transferable, paymentInfo?.partialFee])
  const signDisabled = !isReady || !hasFunds

  const getMessage = (fee?: BN) => {
    return `Insufficient funds to cover the title edition. You need at least ${fee?.toString()} tJOY on your account for this action.`
  }

  if (!threadAuthor || !controllerAccount) {
    return null
  }

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <RowGapBlock gap={24}>
          <RowGapBlock gap={16}>
            <TextMedium>You intend to edit thread title.</TextMedium>
            <TextMedium>
              A fee of <TokenValue value={paymentInfo?.partialFee} /> will be applied to the transaction.
            </TextMedium>
          </RowGapBlock>
          <InputComponent
            label="Fee paid by account"
            inputSize="l"
            disabled
            borderless
            message={hasFunds ? undefined : getMessage(paymentInfo?.partialFee)}
          >
            <SelectedAccount account={controllerAccount} />
          </InputComponent>
        </RowGapBlock>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee.toBn()}
        next={{ disabled: signDisabled, label: 'Sign and save title', onClick: sign }}
      />
    </TransactionModal>
  )
}
