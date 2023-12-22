import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { Account } from '@/accounts/types'
import { TextMedium } from '@/common/components/typography'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'

interface SignProps {
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Account
  service: ActorRef<any>
}

export const ConfirmStakingAccModal = ({ transaction, signer, service }: SignProps) => (
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
  </SignTransactionModal>
)
