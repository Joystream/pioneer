import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useEffect, useState } from 'react'

import { SelectedAccount } from '../../../accounts/components/SelectAccount'
import { useAccounts } from '../../../accounts/hooks/useAccounts'
import { useBalance } from '../../../accounts/hooks/useBalance'
import { accountOrNamed } from '../../../accounts/model/accountOrNamed'
import { ButtonPrimary } from '../../../common/components/buttons'
import { Help } from '../../../common/components/Help'
import { BalanceInfoNarrow, InfoTitle, InfoValue, ModalBody, ModalFooter, Row } from '../../../common/components/Modal'
import { TransactionModal } from '../../../common/components/TransactionModal'
import { TextMedium, TokenValue } from '../../../common/components/typography'
import { useSignAndSendTransaction } from '../../../common/hooks/useSignAndSendTransaction'
import { Address, onTransactionDone } from '../../../common/types'

interface SignProps {
  onClose: () => void
  onDone: onTransactionDone
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
}

export const ApplyForRoleSignModal = ({ onClose, onDone, transaction, signer }: SignProps) => {
  const { allAccounts } = useAccounts()
  const signerAccount = accountOrNamed(allAccounts, signer, 'ControllerAccount')
  const { paymentInfo, send, status } = useSignAndSendTransaction({
    transaction,
    signer: signer,
    onDone,
  })
  const [hasFunds, setHasFunds] = useState(false)
  const balance = useBalance(signer)
  const transferable = balance?.transferable
  const partialFee = paymentInfo?.partialFee

  useEffect(() => {
    if (transferable && partialFee) {
      setHasFunds(transferable.gte(partialFee))
    }
  }, [partialFee?.toString(), transferable?.toString()])

  const signDisabled = status !== 'READY' || !hasFunds

  return (
    <TransactionModal status={status} onClose={onClose}>
      <ModalBody>
        <TextMedium>You intend to apply to an opening...</TextMedium>
        <TextMedium>
          Fees of <TokenValue value={partialFee?.toBn()} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <SelectedAccount account={signerAccount} />
        </Row>
      </ModalBody>
      <ModalFooter>
        <BalanceInfoNarrow>
          <InfoTitle>Transaction fee:</InfoTitle>
          <InfoValue>
            <TokenValue value={partialFee?.toBn()} />
          </InfoValue>
          <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} absolute />
        </BalanceInfoNarrow>
        <ButtonPrimary size="medium" onClick={send} disabled={signDisabled}>
          Sign and create a member
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
