import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'

import { SelectedAccount } from '../../../accounts/components/SelectAccount'
import { useAccounts } from '../../../accounts/hooks/useAccounts'
import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent } from '../../../common/components/forms'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '../../../common/components/Modal'
import { TransactionInfo } from '../../../common/components/TransactionInfo'
import { TransactionModal } from '../../../common/components/TransactionModal'
import { TextMedium } from '../../../common/components/typography'
import { useSignAndSendTransaction } from '../../../common/hooks/useSignAndSendTransaction'
import { onTransactionDone } from '../../../common/types'
import { WorkingGroupApplication } from '../../types/WorkingGroupApplication'

interface Props {
  onClose: () => void
  onDone: onTransactionDone
  application: WorkingGroupApplication
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
}

export const WithdrawApplicationSignModal = ({ onClose, onDone, application, transaction }: Props) => {
  const { allAccounts } = useAccounts()
  const signer = allAccounts.find((account) => account.address == application.roleAccount)
  const { paymentInfo, send, status } = useSignAndSendTransaction({
    transaction,
    signer: signer?.address ?? '',
    onDone,
  })
  return (
    <TransactionModal status={status} onClose={onClose}>
      <ModalBody>
        <Row>
          <TextMedium margin="s">Withdraw application for {application.opening.groupName}</TextMedium>
        </Row>
        <InputComponent label="From" inputSize="l" disabled={true}>
          {signer ? (
            <SelectedAccount account={signer} />
          ) : (
            <TextMedium margin="s">
              Application withdrawal can only be signed with the application's role account
            </TextMedium>
          )}
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee.toBn()}
            helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={send} disabled={!signer}>
          Sign and withdraw application
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
