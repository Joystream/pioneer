import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
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
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { PreviewPostButton } from '@/forum/components/PreviewPostButton'
import { ForumPost } from '@/forum/types'
import { Member } from '@/memberships/types'

interface PostActionSignModalCommonProps {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  author?: Member
  newText?: string
  replyTo?: ForumPost
}

interface PostActionSignModalDeleteProps extends PostActionSignModalCommonProps {
  action: 'delete'
}

interface PostActionSignModalEditProps extends PostActionSignModalCommonProps {
  action: 'edit'
  author: Member
  newText: string
}

export type PostActionSignModalProps = PostActionSignModalDeleteProps | PostActionSignModalEditProps

const actionTexts = {
  edit: 'You intend to edit your post.',
  delete: 'You intend to delete your post.',
}

const getActionText = (action: 'delete' | 'edit') => actionTexts[action]

export const PostActionSignModal = ({
  transaction,
  service,
  controllerAccount,
  action,
  author,
  newText,
  replyTo,
  onClose,
}: PostActionSignModalProps) => {
  const { isReady, paymentInfo, sign } = useSignAndSendTransaction({
    transaction,
    signer: controllerAccount.address,
    service,
  })
  const balance = useBalance(controllerAccount.address)

  const hasFunds = useMemo(() => {
    if (balance?.transferable && paymentInfo?.partialFee) {
      return balance.transferable.gte(paymentInfo.partialFee)
    }
    return false
  }, [controllerAccount.address, balance?.transferable, paymentInfo?.partialFee])
  const signDisabled = !isReady || !hasFunds

  return (
    <>
      <TransactionModal onClose={onClose} service={service}>
        <ModalBody>
          <RowGapBlock gap={24}>
            <RowGapBlock gap={16}>
              <TextMedium>{getActionText(action)}</TextMedium>
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
            <TransactionInfo
              title="Transaction fee:"
              value={paymentInfo?.partialFee.toBn()}
              tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
            />
          </TransactionInfoContainer>
          <ButtonsGroup align="right">
            {action === 'edit' && (
              <PreviewPostButton
                author={author as Member}
                postText={newText as string}
                replyTo={replyTo as ForumPost}
              />
            )}
            <ButtonPrimary size="medium" disabled={signDisabled} onClick={sign}>
              Sign and {action}
              <Arrow direction="right" />
            </ButtonPrimary>
          </ButtonsGroup>
        </ModalFooter>
      </TransactionModal>
    </>
  )
}
