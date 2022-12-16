import BN from 'bn.js'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface PostInsufficientFundsModalProps {
  requiredAmount: BN
  feeInfo: { transactionFee: BN; canAfford: boolean }
  postDeposit?: BN
}

export const PostInsufficientFundsModal = ({
  feeInfo,
  requiredAmount,
  postDeposit,
}: PostInsufficientFundsModalProps) => {
  const { t } = useTranslation('accounts')
  const { hideModal } = useModal()
  const { active } = useMyMemberships()
  return (
    <InsufficientFundsModal onClose={hideModal} address={active?.controllerAccount ?? ''} amount={requiredAmount}>
      <TextMedium margin="s">
        {t('modals.insufficientFunds.feeInfo1')}
        {feeInfo.transactionFee.gtn(0) && (
          <>
            <TokenValue value={feeInfo.transactionFee} />
            {t('modals.insufficientFunds.feeInfo2')}
          </>
        )}
        {postDeposit?.gtn(0) && (
          <>
            {feeInfo.transactionFee.gtn(0) && <> and</>} <TokenValue value={postDeposit} /> available to deposit to make
            the post editable
          </>
        )}
      </TextMedium>
    </InsufficientFundsModal>
  )
}
