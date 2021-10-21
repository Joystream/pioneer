import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextInlineMedium, TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'
import { VoteStatus } from '@/proposals/modals/VoteForProposal/machine'

interface Props {
  voteStatus: VoteStatus
  service: ActorRef<any>
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
  proposalTitle: string
}

export const VoteForProposalSignModal = ({ service, signer, transaction, voteStatus, proposalTitle }: Props) => {
  const { allAccounts } = useMyAccounts()
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({ transaction, signer, service })
  const signerAccount = accountOrNamed(allAccounts, signer, 'ControllerAccount')
  const balance = useBalance(signerAccount.address)

  const hasFunds = useMemo(() => {
    if (balance?.transferable && paymentInfo?.partialFee) {
      return balance.transferable.gte(paymentInfo?.partialFee)
    }
    return false
  }, [signerAccount.address, balance?.transferable, paymentInfo?.partialFee])
  const signDisabled = !isReady || !hasFunds

  return (
    <TransactionModal onClose={() => undefined} service={service}>
      <ModalBody>
        <RowGapBlock gap={24}>
          <RowGapBlock gap={16}>
            <TextMedium>
              You intend to <TextInlineMedium bold>{voteStatus}</TextInlineMedium> the Proposal "{proposalTitle}".
            </TextMedium>
            <TextMedium>
              A fee of <TokenValue value={paymentInfo?.partialFee} /> will be applied to the transaction.
            </TextMedium>
          </RowGapBlock>
          <InputComponent
            label="Fee paid by account"
            inputSize="l"
            disabled
            borderless
            message={
              hasFunds
                ? undefined
                : `Insufficient funds to cover the transaction fee. You need at least ${paymentInfo?.partialFee?.toString()} JOY on your account for this action.`
            }
          >
            <SelectedAccount account={signerAccount} />
          </InputComponent>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee?.toBn()}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={sign} disabled={signDisabled}>
          Sign transaction and Vote
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
