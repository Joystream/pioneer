import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { Account } from '@/accounts/types'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { PreviewPostButton } from '@/forum/components/PreviewPostButton'
import { ForumPost } from '@/forum/types'
import { Member } from '@/memberships/types'

interface CreatePostSignModalProps {
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  author: Member
  postText: string
  replyTo?: ForumPost
  isEditable?: boolean
  postDeposit: BN
}

export const CreatePostSignModal = ({
  transaction,
  service,
  controllerAccount,
  author,
  postText,
  replyTo,
  isEditable,
  postDeposit,
}: CreatePostSignModalProps) => {
  const { hideModal } = useModal()
  const { isReady, paymentInfo, sign } = useSignAndSendTransaction({
    transaction,
    signer: controllerAccount.address,
    service,
  })
  const balance = useBalance(controllerAccount.address)

  const hasFunds = useMemo(() => {
    if (balance?.transferable && paymentInfo?.partialFee) {
      if (isEditable) {
        return balance.transferable.gte(paymentInfo.partialFee.add(postDeposit))
      }
      return balance.transferable.gte(paymentInfo.partialFee)
    }
    return false
  }, [controllerAccount.address, balance?.transferable, paymentInfo?.partialFee, isEditable])
  const signDisabled = !isReady || !hasFunds

  return (
    <>
      <TransactionModal onClose={hideModal} service={service}>
        <ModalBody>
          <RowGapBlock gap={24}>
            <RowGapBlock gap={16}>
              <TextMedium>You intend to post in a thread.</TextMedium>
              {isEditable && (
                <TextMedium>
                  <TokenValue value={postDeposit} /> will be deposited to make the post editable.
                </TextMedium>
              )}
              <TextMedium>
                A fee of <TokenValue value={paymentInfo?.partialFee} /> will be applied to the transaction.
              </TextMedium>
            </RowGapBlock>
            <InputComponent label="Fee paid by account" inputSize="l" disabled borderless>
              <SelectedAccount account={controllerAccount} />
            </InputComponent>
          </RowGapBlock>
        </ModalBody>
        <ModalFooter>
          <TransactionInfoContainer>
            {isEditable && (
              <TransactionInfo
                title="Post deposit:"
                value={postDeposit}
                tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
              />
            )}
            <TransactionInfo
              title="Transaction fee:"
              value={paymentInfo?.partialFee.toBn()}
              tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
            />
          </TransactionInfoContainer>
          <ButtonsGroup align="right">
            <PreviewPostButton author={author} postText={postText} replyTo={replyTo} />
            <ButtonPrimary size="medium" disabled={signDisabled} onClick={sign}>
              {replyTo ? 'Sign and reply' : 'Sign and post'}
              <Arrow direction="right" />
            </ButtonPrimary>
          </ButtonsGroup>
        </ModalFooter>
      </TransactionModal>
    </>
  )
}
