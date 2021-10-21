import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { ButtonPrimary } from '@/common/components/buttons'
import { ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'

interface Props {
  service: ActorRef<any>
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
}
export const VoteForProposalSignModal = ({ service, signer, transaction }: Props) => {
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({ transaction, signer, service })

  return (
    <TransactionModal onClose={() => undefined} service={service}>
      {/*<ModalBody>*/}
      {/*  <RowGapBlock gap={24}>*/}
      {/*    <RowGapBlock gap={16}>*/}
      {/*      <TextMedium>You intend to create a thread.</TextMedium>*/}
      {/*      <TextMedium>*/}
      {/*        A fee of <TokenValue value={paymentInfo?.partialFee} /> will be applied to the transaction.*/}
      {/*      </TextMedium>*/}
      {/*    </RowGapBlock>*/}
      {/*    <InputComponent*/}
      {/*      label="Fee paid by account"*/}
      {/*      inputSize="l"*/}
      {/*      disabled*/}
      {/*      borderless*/}
      {/*      message={hasFunds ? undefined : getMessage(fullAmount)}*/}
      {/*    >*/}
      {/*      <SelectedAccount account={controllerAccount} />*/}
      {/*    </InputComponent>*/}
      {/*  </RowGapBlock>*/}
      {/*</ModalBody>*/}
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee?.toBn()}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={sign} disabled={!isReady}>
          Sign transaction and Stake
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
