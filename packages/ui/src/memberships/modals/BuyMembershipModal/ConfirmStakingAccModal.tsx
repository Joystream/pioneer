import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { Account } from '@/accounts/types'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'

interface SignProps {
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Account
  service: ActorRef<any>
}

export const ConfirmStakingAccModal = ({ transaction, signer, service }: SignProps) => {
  const { paymentInfo } = useSignAndSendTransaction({
    transaction,
    signer: signer.address,
    service,
  })

  return (
    <SignTransactionModal
      buttonText="Sign and Confirm"
      transaction={transaction}
      signer={signer.address}
      skipQueryNode
      service={service}
      useMultiTransaction={{
        steps: [
          { title: 'Create Membership' },
          { title: 'Bind Validator Account' },
          { title: 'Confirm Validator Account' },
        ],
        active: 2,
      }}
    >
      <TextMedium>You are intending to confirm your validator account to be bound with your membership</TextMedium>
      <TextMedium>
        Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be applied to the transaction.
      </TextMedium>
    </SignTransactionModal>
  )
}
