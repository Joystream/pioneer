import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'

import { SelectedAccount } from '../../../accounts/components/SelectAccount'
import { useAccounts } from '../../../accounts/hooks/useAccounts'
import { useBalance } from '../../../accounts/hooks/useBalance'
import { TransactionInfo } from '../../../accounts/modals/TransferModal/TransactionInfo'
import { accountOrNamed } from '../../../accounts/model/accountOrNamed'
import { ButtonPrimary } from '../../../common/components/buttons'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '../../../common/components/Modal'
import { TransactionModal } from '../../../common/components/TransactionModal'
import { TextMedium, TokenValue } from '../../../common/components/typography'
import { useSignAndSendTransaction } from '../../../common/hooks/useSignAndSendTransaction'
import { Address, onTransactionDone } from '../../../common/types'

interface SignProps {
  onClose: () => void
  onDone: onTransactionDone
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
  stake: BN
}

export const ApplyForRoleSignModal = ({ onClose, onDone, transaction, signer, stake }: SignProps) => {
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
        <TextMedium>You intend to apply for a role.</TextMedium>
        <TextMedium>
          You intend to stake <TokenValue value={stake} />.
        </TextMedium>
        <TextMedium>
          Fees of <TokenValue value={partialFee?.toBn()} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <SelectedAccount account={signerAccount} />
        </Row>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Stake:"
            value={stake}
            helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
          <TransactionInfo
            title="Transaction fee:"
            value={partialFee?.toBn()}
            helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={send} disabled={signDisabled}>
          Sign transaction and Stake
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
