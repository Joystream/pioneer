import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'

interface Props {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  reward: number
}

export const ClaimRewardSignModal = ({ onClose, transaction, service, controllerAccount, reward }: Props) => {
  const { t } = useTranslation('bounty')
  const { allAccounts } = useMyAccounts()

  const { sign, isReady, paymentInfo } = useSignAndSendTransaction({
    service,
    transaction,
    signer: controllerAccount.address,
  })

  return (
    <TransactionModal onClose={onClose} service={service} title={t('modals.claimReward.title')}>
      <ModalBody>
        <TextMedium light> <TokenValue value={reward} /></TextMedium>
        <TextMedium light>
          {t('modals.claimReward.feeInfo1')}
          <TokenValue value={paymentInfo?.partialFee.toBn()} />
          {t('modals.claimReward.feeInfo2')}
        </TextMedium>

        <InputComponent label={t('common:modals.transactionFee.feeSending')} inputSize="l">
          <SelectedAccount account={accountOrNamed(allAccounts, controllerAccount.address, 'Account')} />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title={t('common:modals.transactionFee.label')}
            value={paymentInfo?.partialFee.toBn()}
            tooltipText={t('common:modals.transactionFee.tooltipText')}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={!isReady} onClick={sign}>
        {t('modals.claimReward.title')}
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
