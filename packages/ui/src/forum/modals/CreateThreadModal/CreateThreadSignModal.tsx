import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import { useActor } from '@xstate/react'
import BN from 'bn.js'
import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'

import { getMessage } from './utils'

interface Props {
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  postDeposit: BN
  threadDeposit: BN
}

export const CreateThreadSignModal = ({
  transaction,
  service,
  controllerAccount,
  postDeposit,
  threadDeposit,
}: Props) => {
  const { hideModal } = useModal()
  const { paymentInfo } = useSignAndSendTransaction({ transaction, signer: controllerAccount.address, service })
  const balance = useBalance(controllerAccount.address)
  const [state, send] = useActor(service)
  const fullAmount = paymentInfo?.partialFee.add(postDeposit).add(threadDeposit)

  const hasFunds = useMemo(() => {
    if (balance?.transferable && fullAmount) {
      return balance.transferable.gte(fullAmount)
    }
    return false
  }, [controllerAccount.address, balance?.transferable, paymentInfo?.partialFee])
  const signDisabled = !state.matches('prepare') || !hasFunds

  return (
    <TransactionModal onClose={hideModal} service={service}>
      <ModalBody>
        <RowGapBlock gap={24}>
          <RowGapBlock gap={16}>
            <TextMedium>You intend to create a thread.</TextMedium>
            <TextMedium>
              A fee of <TokenValue value={paymentInfo?.partialFee} /> will be applied to the transaction.
            </TextMedium>
          </RowGapBlock>
          <InputComponent
            label="Fee paid by account"
            inputSize="l"
            disabled
            borderless
            message={hasFunds ? undefined : getMessage(fullAmount)}
          >
            <SelectedAccount account={controllerAccount} />
          </InputComponent>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title="Thread creation and initial post deposit:"
            value={postDeposit.add(threadDeposit)}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee.toBn()}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={signDisabled} onClick={() => send('SIGN')}>
          Sign and send
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
