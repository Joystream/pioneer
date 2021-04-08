import { ApiRx } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import React, { useMemo } from 'react'

import { SelectedAccount } from '../../../accounts/components/SelectAccount'
import { Account } from '../../../accounts/types'
import { ButtonPrimary } from '../../../common/components/buttons'
import { Label } from '../../../common/components/forms'
import { Help } from '../../../common/components/Help'
import { ModalBody, ModalFooter } from '../../../common/components/Modal'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../../../common/components/Modals'
import { TransactionModal } from '../../../common/components/TransactionModal'
import { TextMedium, TokenValue } from '../../../common/components/typography'
import { useApi } from '../../../common/hooks/useApi'
import { useSignAndSendTransaction } from '../../../common/hooks/useSignAndSendTransaction'
import { onTransactionDone } from '../../../common/types'
import { WithNullableValues } from '../../../common/types/form'
import { BaseMember } from '../../types'

import { UpdateMemberForm } from './types'

interface SignProps {
  onClose: () => void
  transactionParams: WithNullableValues<UpdateMemberForm>
  onDone: onTransactionDone
  member: BaseMember
  signer: Account
}

const hasEdits = (object: Record<string, any>, fields: string[]) => {
  return fields.some((field) => !!object[field])
}

function createBatch(
  transactionParams: WithNullableValues<UpdateMemberForm>,
  api: ApiRx | undefined,
  member: BaseMember
) {
  const hasProfileEdits = hasEdits(transactionParams, ['about', 'handle', 'avatarUri', 'name'])
  const hasAccountsEdits = hasEdits(transactionParams, ['rootAccount', 'controllerAccount'])

  const transactions: SubmittableExtrinsic<'rxjs'>[] = []

  if (!api || !(hasProfileEdits || hasAccountsEdits)) {
    return
  }

  if (hasProfileEdits) {
    const updateProfile = api.tx.members.updateProfile(member.id, transactionParams.handle || null, {
      name: transactionParams.name || null,
      avatar_uri: transactionParams.avatarUri || null,
      about: transactionParams.about || null,
    })
    transactions.push(updateProfile)
  }

  if (hasAccountsEdits) {
    const updateAccounts = api.tx.members.updateAccounts(
      member.id,
      transactionParams.rootAccount?.address || null,
      transactionParams.controllerAccount?.address || null
    )
    transactions.push(updateAccounts)
  }

  return api.tx.utility.batch(transactions)
}

export const UpdateMembershipSignModal = ({ onClose, transactionParams, member, signer, onDone }: SignProps) => {
  const { api } = useApi()
  const updateProfileTransaction = useMemo(() => createBatch(transactionParams, api, member), [member.id])

  const { paymentInfo, send, status } = useSignAndSendTransaction({
    transaction: updateProfileTransaction,
    signer: signer.address,
    onDone,
  })

  return (
    <TransactionModal status={status} onClose={onClose}>
      <ModalBody>
        <TextMedium>
          You intend to update your membership. Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be
          applied to the transaction.
        </TextMedium>
        <Row>
          <Label>Sending from account</Label>
          <SelectedAccount account={signer} />
        </Row>
      </ModalBody>
      <ModalFooter>
        <BalanceInfoNarrow>
          <InfoTitle>Transaction fee:</InfoTitle>
          <InfoValue>
            <TokenValue value={paymentInfo?.partialFee.toBn()} />
          </InfoValue>
          <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} absolute />
        </BalanceInfoNarrow>
        <ButtonPrimary size="medium" onClick={send} disabled={status !== 'READY'}>
          Sign and update a member
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
