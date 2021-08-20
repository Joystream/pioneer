import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useEffect, useState } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { Label, TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal, TransactionStep } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'
import { MemberInfo } from '@/memberships/components'
import { useMember } from '@/memberships/hooks/useMembership'
import { MemberRow } from '@/memberships/modals/components'

interface SignProps {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
  service: ActorRef<any>
  memberId: string
  steps: TransactionStep[]
}

export const BindStakingAccountModal = ({ onClose, transaction, signer, service, memberId, steps }: SignProps) => {
  const { allAccounts } = useMyAccounts()
  const { member } = useMember(memberId)
  const signerAccount = accountOrNamed(allAccounts, signer, 'Account to Bind')
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
    <TransactionModal onClose={onClose} service={service} useMultiTransaction={{ steps, active: 0 }}>
      <ModalBody>
        <TextMedium>You intend to bind account for staking</TextMedium>
        <TextMedium>
          Fees of <TokenValue value={partialFee?.toBn()} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <Label>Staking account</Label>
          <SelectedAccount account={signerAccount} />
        </Row>
        <Label>Member</Label>
        <MemberRow>{member && <MemberInfo member={member} skipModal />}</MemberRow>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Transaction fee:"
            value={partialFee?.toBn()}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={sign} disabled={signDisabled}>
          Sign transaction and bind Staking Account
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
