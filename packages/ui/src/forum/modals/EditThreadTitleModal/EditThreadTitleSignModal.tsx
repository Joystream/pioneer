import BN from 'bn.js'
import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { formatJoyValue } from '@/common/model/formatters'
import { ForumThreadWithDetails } from '@/forum/types'

interface EditThreadTitleSignModalProps {
  thread: ForumThreadWithDetails
  newTitle: string
  service: ActorRef<any>
  onClose: () => void
}

export const EditThreadTitleSignModal = ({ thread, newTitle, service, onClose }: EditThreadTitleSignModalProps) => {
  const { api } = useApi()
  const { allAccounts: myAccounts } = useMyAccounts()

  const transaction = useMemo(() => {
    if (api?.isConnected) {
      return api.tx.forum.editThreadMetadata(thread.author.id, thread.categoryId, thread.id, newTitle)
    }
  }, [newTitle, thread.author, api?.isConnected])

  const controllerAccount = accountOrNamed(myAccounts, thread.author?.controllerAccount as string, 'Controller Account')

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
    return `Insufficient funds to cover the title edition. You need at least ${fee ? formatJoyValue(fee) : '-'} ${
      CurrencyName.integerValue
    } on your account for this action.`
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
