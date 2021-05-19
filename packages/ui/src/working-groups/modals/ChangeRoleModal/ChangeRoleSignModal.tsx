import React, { FC } from 'react'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useAccounts } from '@/accounts/hooks/useAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TransactionModal } from '@/common/components/TransactionModal'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { onTransactionDone } from '@/common/types'
import { getGroup } from '@/working-groups/model/getGroup'
import { WorkerWithDetails } from '@/working-groups/types'

interface Props {
  onClose: () => void
  worker: WorkerWithDetails
  onDone: onTransactionDone
  selectedAccount: Account
}

export const ChangeRoleSignModal: FC<Props> = ({ onClose, worker, onDone, selectedAccount }) => {
  const { allAccounts } = useAccounts()
  const { api } = useApi()
  const transaction = getGroup(api, worker.group.name)?.updateRoleAccount(worker.id, selectedAccount?.address)
  const signer = accountOrNamed(allAccounts, worker.membership.controllerAccount, 'Controller account')
  const { paymentInfo, send, status } = useSignAndSendTransaction({
    transaction,
    signer: signer?.address ?? '',
    onDone,
  })

  return (
    <TransactionModal status={status} onClose={onClose}>
      <ModalBody>
        <Row>
          <TextMedium>The transaction can only be signed with the membership's controller account.</TextMedium>
        </Row>
        <InputComponent label="From" inputSize="l" disabled={true}>
          <SelectedAccount account={signer} />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title="Transaction fee:" value={paymentInfo?.partialFee.toBn()} />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={send} disabled={!signer}>
          Sign and change role
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
