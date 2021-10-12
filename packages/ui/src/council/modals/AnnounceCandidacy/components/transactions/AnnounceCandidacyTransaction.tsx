import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal, TransactionStep } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'

interface AnnounceCandidacyTransactionProps {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
  stake: BN
  service: ActorRef<any>
  steps: TransactionStep[]
}

export const AnnounceCandidacyTransaction = ({
  onClose,
  transaction,
  signer,
  stake,
  service,
  steps,
}: AnnounceCandidacyTransactionProps) => {
  const { allAccounts } = useMyAccounts()
  const signerAccount = accountOrNamed(allAccounts, signer, 'ControllerAccount')
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({ transaction, signer, service })
  const [hasFunds, setHasFunds] = useState(false)
  const balance = useBalance(signer)
  const transferable = balance?.transferable
  const partialFee = paymentInfo?.partialFee

  useEffect(() => {
    if (transferable && partialFee) {
      setHasFunds(transferable.gte(partialFee))
    }
  }, [partialFee?.toString(), transferable?.toString()])

  const signDisabled = !isReady || !hasFunds

  return (
    <TransactionModal onClose={onClose} service={service} useMultiTransaction={{ steps, active: 1 }}>
      <ModalBody>
        <TextMedium>You intend to announce candidacy.</TextMedium>
        <TextMedium>
          Also you intend to stake <TokenValue value={stake} />.
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
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
          <TransactionInfo
            title="Transaction fee:"
            value={partialFee?.toBn()}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={sign} disabled={signDisabled}>
          Sign transaction and Announce
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
