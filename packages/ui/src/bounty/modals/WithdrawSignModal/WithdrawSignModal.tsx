import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActorRef } from 'xstate'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { WithdrawInfo } from '@/bounty/components/WithdrawInfo/WithdrawInfo'
import { Bounty, Contributor } from '@/bounty/types/Bounty'
import { ButtonPrimary } from '@/common/components/buttons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { formatTokenValue } from '@/common/model/formatters'

export interface Props {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  type: 'stake' | 'contribution' | 'reward'
  amount: BN
  isContributor?: boolean
  bounty?: Bounty
  contribution?: Contributor
}

export const WithdrawSignModal = ({
  onClose,
  transaction,
  service,
  controllerAccount,
  type,
  amount,
  isContributor,
  bounty,
  contribution,
}: Props) => {
  const { t } = useTranslation('bounty')
  const { allAccounts } = useMyAccounts()

  const { sign, isReady, paymentInfo } = useSignAndSendTransaction({
    service,
    transaction,
    signer: controllerAccount.address,
  })

  const extraAmount =
    bounty && isContributor && contribution
      ? bounty.cherry.toNumber() * ((contribution.amount as any) / bounty.totalFunding.toNumber())
      : 0
  const bountyFailedInfo = bounty?.stage === 'failed' && isContributor

  return (
    <TransactionModal onClose={onClose} service={service} title={t(`modals.withdraw.${type}.title`)}>
      <ModalBody>
        <TextMedium light>{`${t(`modals.withdraw.${type}.description`, { value: formatTokenValue(amount) })} ${
          bountyFailedInfo
            ? t('modals.withdraw.extraDescription', {
                amount: formatTokenValue(extraAmount),
              })
            : ''
        }`}</TextMedium>
        <WithdrawInfo
          account={accountOrNamed(allAccounts, controllerAccount.address, 'Account')}
          stakingFromTitle={t(`modals.withdraw.${type}.stakingFrom`)}
          amountTitle={t(`modals.withdraw.${type}.amountTitle`)}
          amount={amount.addn(extraAmount)}
        />
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title={t('modals.common.amount')}
            value={amount.addn(extraAmount)}
            tooltipText={bountyFailedInfo ? t('modals.withdraw.extraTooltipInformation') : undefined}
          />
          <TransactionInfo
            title={t('modals.common.transactionFee.title')}
            value={paymentInfo?.partialFee.toBn()}
            tooltipText={t('modals.common.transactionFee.tooltip')}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={!isReady} onClick={sign}>
          {t(`modals.withdraw.${type}.button`)}
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
