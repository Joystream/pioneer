import { MembershipMetadata } from '@joystream/metadata-protobuf'
import { ApiRx } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { Label } from '@/common/components/forms'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TransactionModal } from '@/common/components/TransactionModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { WithNullableValues } from '@/common/types/form'

import { Member } from '../../types'

import { UpdateMemberForm } from './types'

interface SignProps {
  onClose: () => void
  transactionParams: WithNullableValues<UpdateMemberForm>
  member: Member
  service: ActorRef<any>
}

const hasEdits = (object: Record<string, any>, fields: string[]) => {
  return fields.some((field) => !!object[field])
}

function createBatch(transactionParams: WithNullableValues<UpdateMemberForm>, api: ApiRx | undefined, member: Member) {
  const hasProfileEdits = hasEdits(transactionParams, ['about', 'handle', 'avatarUri', 'name'])
  const hasAccountsEdits = hasEdits(transactionParams, ['rootAccount', 'controllerAccount'])

  const transactions: SubmittableExtrinsic<'rxjs'>[] = []

  if (!api || !(hasProfileEdits || hasAccountsEdits)) {
    return
  }

  if (hasProfileEdits) {
    const updateProfile = api.tx.members.updateProfile(
      member.id,
      transactionParams.handle ?? null,
      metadataToBytes(MembershipMetadata, {
        about: transactionParams.about ?? null,
        name: transactionParams.name ?? null,
      })
    )
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

export const UpdateMembershipSignModal = ({ onClose, transactionParams, member, service }: SignProps) => {
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const transaction = useMemo(() => createBatch(transactionParams, api, member), [member.id])
  const signer = accountOrNamed(allAccounts, member.controllerAccount, 'Controller account')

  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({ transaction, signer: signer.address, service })

  return (
    <TransactionModal onClose={onClose} service={service}>
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
        <TransactionInfoContainer>
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee.toBn()}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={sign} disabled={!isReady}>
          Sign and update a member
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
