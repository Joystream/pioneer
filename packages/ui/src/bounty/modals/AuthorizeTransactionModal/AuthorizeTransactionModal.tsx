import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalTransactionFooter } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { MultiTransactionConfig, TransactionModal } from '@/common/modals/TransactionModal'
import { formatJoyValue, formatTokenValue } from '@/common/model/formatters'

export interface Props {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  description: React.ReactNode
  buttonLabel: string
  contributeAmount?: BN
  useMultiTransaction?: MultiTransactionConfig
  skipQueryNodeCheck?: boolean
}
// todo should be removed
export const AuthorizeTransactionModal = ({
  onClose,
  transaction,
  service,
  controllerAccount,
  description,
  buttonLabel,
  contributeAmount,
  useMultiTransaction,
  skipQueryNodeCheck,
}: Props) => {
  const { t } = useTranslation('bounty')
  const { sign, isReady, paymentInfo, canAfford } = useSignAndSendTransaction({
    service,
    transaction,
    signer: controllerAccount.address,
    skipQueryNode: skipQueryNodeCheck,
  })
  const signDisabled = !isReady || !canAfford

  return (
    <TransactionModal onClose={onClose} service={service} useMultiTransaction={useMultiTransaction}>
      <ModalBody>
        <div>
          <TextMedium light margin="xs">
            {description}
          </TextMedium>
          <TextMedium light>
            {t('modals.authorizeTransaction.feeInfo', {
              value: formatJoyValue(paymentInfo?.partialFee ?? BN_ZERO, { precision: 2 }) ?? '-',
            })}
          </TextMedium>
        </div>
        <InputComponent
          label={t('modals.authorizeTransaction.feeAccount.label')}
          inputSize="l"
          required
          tooltipText={t('modals.authorizeTransaction.feeAccount.tooltip')}
        >
          <SelectedAccount account={controllerAccount} />
        </InputComponent>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee}
        next={{ disabled: signDisabled, label: buttonLabel, onClick: sign }}
      >
        {contributeAmount && (
          <TransactionInfo
            title={t('modals.common.contributeAmount', { value: formatTokenValue(contributeAmount) })}
            value={contributeAmount}
          />
        )}
      </ModalTransactionFooter>
    </TransactionModal>
  )
}
