import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import { useActor } from '@xstate/react'
import React, { useMemo, useState } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { Account } from '@/accounts/types'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { PreviewPostModal } from '@/forum/modals/PreviewPostModal/PreviewPostModal'
import { Member } from '@/memberships/types'

interface PostActionSignModalCommonProps {
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  author?: Member
  newText?: string
}

interface PostActionSignModalDeleteProps extends PostActionSignModalCommonProps {
  action: 'delete'
}

interface PostActionSignModalEditProps extends PostActionSignModalCommonProps {
  action: 'edit'
  author: Member
  newText: string
}

interface PostActionCreateProps extends PostActionSignModalCommonProps {
  action: 'create'
}

export type PostActionSignModalProps =
  | PostActionSignModalDeleteProps
  | PostActionSignModalEditProps
  | PostActionCreateProps

const actionTexts = {
  edit: 'You intend to edit your post.',
  delete: 'You intend to delete your post.',
  create: 'You intend to add post.',
}

const getActionText = (action: 'delete' | 'edit' | 'create') => actionTexts[action]

export const PostActionSignModal = ({
  transaction,
  service,
  controllerAccount,
  action,
  author,
  newText,
}: PostActionSignModalProps) => {
  const { hideModal } = useModal()
  const [previewVisible, setPreviewVisible] = useState(false)
  const { paymentInfo } = useSignAndSendTransaction({ transaction, signer: controllerAccount.address, service })
  const [state, send] = useActor(service)
  const balance = useBalance(controllerAccount.address)

  const hasFunds = useMemo(() => {
    if (balance?.transferable && paymentInfo?.partialFee) {
      return balance.transferable.gte(paymentInfo.partialFee)
    }
    return false
  }, [controllerAccount.address, balance?.transferable, paymentInfo?.partialFee])
  const signDisabled = !state.matches('prepare') || !hasFunds

  return (
    <>
      <TransactionModal onClose={hideModal} service={service}>
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
              <ButtonGhost size="medium" onClick={() => setPreviewVisible(true)}>
                Post preview
              </ButtonGhost>
            )}
            <ButtonPrimary size="medium" disabled={signDisabled} onClick={() => send('SIGN')}>
              Sign and {action}
              <Arrow direction="right" />
            </ButtonPrimary>
          </ButtonsGroup>
        </ModalFooter>
      </TransactionModal>
      {previewVisible && action === 'edit' && (
        <PreviewPostModal
          author={author as Member}
          text={newText as string}
          onClose={() => setPreviewVisible(false)}
          type="post"
        />
      )}
    </>
  )
}
