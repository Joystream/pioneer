import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js';
import React from 'react'
import { useTranslation } from 'react-i18next';
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
import { TextMedium } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import {formatTokenValue} from '@/common/model/formatters';

export interface Props {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  description: string
  buttonLabel: string;
  contributeAmount?: BN;
}

export const AuthorizeTransactionModal = ({ onClose, transaction, service, controllerAccount, description, buttonLabel, contributeAmount }: Props) => {
  const { t } = useTranslation('bounty');
  const { allAccounts } = useMyAccounts()

  const { sign, isReady, paymentInfo } = useSignAndSendTransaction({
    service,
    transaction,
    signer: controllerAccount.address,
  })

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium light>{description}</TextMedium>
        <TextMedium light>
          {t('modals.authorizeTransaction.feeInfo', {value: paymentInfo?.partialFee.toString() ?? '-'})}
        </TextMedium>
        <InputComponent label={t('modals.authorizeTransaction.feeAccount')} inputSize="l">
          <SelectedAccount account={accountOrNamed(allAccounts, controllerAccount.address, 'Account')} />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          {contributeAmount && <TransactionInfo
            title={t('modals.common.contributeAmount', {value: formatTokenValue(contributeAmount)})}
            value={contributeAmount}
          />}
          <TransactionInfo
            title={t('modals.common.transactionFee')}
            value={paymentInfo?.partialFee.toBn()}
            tooltipText={t('common:lorem')}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={!isReady} onClick={sign}>
          {buttonLabel}
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
