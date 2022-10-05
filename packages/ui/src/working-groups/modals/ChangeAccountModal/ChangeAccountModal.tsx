import { SubmittableExtrinsic } from '@polkadot/api/types'
import React from 'react'

import { Account } from '@/accounts/types'
import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { FailureModal } from '@/common/components/FailureModal'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { Address } from '@/common/types'
import { useWorker } from '@/working-groups/hooks/useWorker'
import { getGroup } from '@/working-groups/model/getGroup'

import { WorkerWithDetails } from '../../types'

import { ChangeAccountModalCall } from '.'
import { ChangeAccountSelectModal } from './ChangeAccountSelectModal'
import { ChangeAccountSuccessModal } from './ChangeAccountSuccessModal'
import { ModalTypes } from './constants'
import { changeAccountMachine } from './machine'

const getTransaction = (
  worker: WorkerWithDetails,
  api: Api,
  modalType: ModalTypes,
  selectedAddress: Address
): SubmittableExtrinsic<'rxjs'> => {
  const runtimeId = worker.runtimeId
  const group = getGroup(api, worker.group.id)

  if (modalType === ModalTypes.CHANGE_ROLE_ACCOUNT) {
    return group.updateRoleAccount(runtimeId, selectedAddress)
  } else {
    return group.updateRewardAccount(runtimeId, selectedAddress)
  }
}

export const ChangeAccountModal = () => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<ChangeAccountModalCall>()
  const workerId = modalData.workerId
  const modalType = modalData.type
  const { worker } = useWorker(workerId)
  const [state, send] = useMachine(changeAccountMachine)

  if (state.matches('prepare') || !worker || !api) {
    return (
      <ChangeAccountSelectModal
        title={modalType === ModalTypes.CHANGE_ROLE_ACCOUNT ? 'Change role account' : 'Change reward account'}
        buttonLabel="Change"
        onClose={hideModal}
        onAccept={(account: Account) => send('DONE', { selectedAddress: account.address })}
      />
    )
  }

  if (state.matches('transaction')) {
    const transaction = getTransaction(worker, api, modalType, state.context.selectedAddress)

    return (
      <SignTransactionModal
        buttonText={
          modalType === ModalTypes.CHANGE_ROLE_ACCOUNT
            ? 'Sign and change role account'
            : 'Sign and change reward account'
        }
        transaction={transaction}
        signer={worker.membership.controllerAccount}
        service={state.children.transaction}
      >
        <TextMedium>The transaction can only be signed with the membership's controller account.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('success')) {
    return (
      <ChangeAccountSuccessModal onClose={hideModal}>
        {modalType === ModalTypes.CHANGE_ROLE_ACCOUNT
          ? 'You have successfully changed the role account.'
          : 'You have successfully changed the reward account.'}
      </ChangeAccountSuccessModal>
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {modalType === ModalTypes.CHANGE_ROLE_ACCOUNT
          ? 'There was a problem changing the role account.'
          : 'There was a problem changing the reward account.'}
      </FailureModal>
    )
  }

  return null
}
