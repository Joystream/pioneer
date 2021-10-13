import crypto from 'crypto'

import BN from 'bn.js'
import React, { useMemo } from 'react'
import { ActorRef, State } from 'xstate'

import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, ValueInJoys } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { formatTokenValue } from '@/common/model/formatters'
import { TransactionEvent } from '@/common/model/machines'
import { TransactionContext } from '@/proposals/modals/AddNewProposal/machine'

import { StakeFormFields, VoteForCouncilModalCall } from './types'

interface Props {
  service: ActorRef<TransactionEvent, State<TransactionContext>>
  stake: StakeFormFields
}

export const VoteForCouncilSignModal = ({ stake, service }: Props) => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<VoteForCouncilModalCall>()

  const commitment = useMemo(() => crypto.createHash('sha256').update(modalData.id).digest(), [modalData.id])

  const transaction = useMemo(() => api?.tx.referendum.vote(commitment, stake.amount), [commitment, stake.amount])
  const { sign, isReady, paymentInfo } = useSignAndSendTransaction({
    service,
    transaction,
    signer: stake.account.address,
  })
  const stakingAmount = new BN(stake.amount)

  return (
    <TransactionModal onClose={hideModal} service={service}>
      <ModalBody>
        <TextMedium light>
          You intend to Vote and stake <ValueInJoys>{formatTokenValue(stakingAmount)}</ValueInJoys>.
          <br />
          Fees of <ValueInJoys>{formatTokenValue(paymentInfo?.partialFee.toBn())}</ValueInJoys> will be applied to the
          transaction.
        </TextMedium>
      </ModalBody>

      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title="Stake:" value={stakingAmount} />
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee.toBn()}
            tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
          />
        </TransactionInfoContainer>

        <ButtonPrimary size="medium" disabled={!isReady} onClick={sign}>
          Sign and send
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
