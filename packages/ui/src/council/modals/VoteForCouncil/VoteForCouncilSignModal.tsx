import BN from 'bn.js'
import React, { useMemo } from 'react'
import { ActorRef, State } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { TransactionEvent } from '@/common/model/machines'
import { useCommitment } from '@/council/hooks/useCommitment'
import { TransactionContext } from '@/proposals/modals/AddNewProposal/machine'

import { StakeFormFields, VoteForCouncilModalCall } from './types'

interface Props {
  service: ActorRef<TransactionEvent, State<TransactionContext>>
  stake: StakeFormFields
}

export const VoteForCouncilSignModal = ({ stake, service }: Props) => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<VoteForCouncilModalCall>()

  const { commitment, isVoteStored } = useCommitment(stake.account.address, modalData.id)

  const transaction = useMemo(() => {
    if (commitment) {
      return api?.tx.referendum.vote(commitment, stake.amount)
    }
  }, [commitment, stake.amount])

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
          You intend to Vote and stake <TokenValue value={stakingAmount} />.
          <br />
          Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be applied to the transaction.
        </TextMedium>

        <InputComponent label="Staking and fee sending from account" inputSize="l">
          <SelectedAccount account={stake.account} />
        </InputComponent>
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

        <ButtonPrimary size="medium" disabled={!isReady || !isVoteStored} onClick={sign}>
          Sign and send
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
