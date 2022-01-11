import {useMachine} from '@xstate/react';
import BN from 'bn.js';
import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {SelectAccount} from '@/accounts/components/SelectAccount';
import {useBalance} from '@/accounts/hooks/useBalance';
import {useMyAccounts} from '@/accounts/hooks/useMyAccounts';
import {useTransactionFee} from '@/accounts/hooks/useTransactionFee';
import {accountOrNamed} from '@/accounts/model/accountOrNamed';
import {Account} from '@/accounts/types';
import {FundedRange} from '@/bounty/components/FundedRange';
import {AuthorizeTransactionModal} from '@/bounty/modals/AuthorizeTransactionModal/AuthorizeTransactionModal';
import {SuccessModal} from '@/bounty/modals/CancelBountyModal/components/SuccessModal';
import {BountyContributeFundsModalCall} from '@/bounty/modals/ContributeFundsModal/index';
import {contributeFundsMachine, ContributeFundStates} from '@/bounty/modals/ContributeFundsModal/machine';
import {FundingLimited, isPerpetual} from '@/bounty/types/Bounty';
import {ButtonPrimary} from '@/common/components/buttons';
import {FailureModal} from '@/common/components/FailureModal';
import {Input, InputComponent, InputNumber} from '@/common/components/forms';
import {
  AmountButton,
  AmountButtons,
  Modal,
  ModalFooter,
  ModalHeader,
  Row,
  ScrolledModalBody,
  ScrolledModalContainer,
  TransactionAmount,
  TransactionInfoContainer
} from '@/common/components/Modal'
import {TransactionInfo} from '@/common/components/TransactionInfo';
import {Fonts} from '@/common/constants';
import {useApi} from '@/common/hooks/useApi';
import {useModal} from '@/common/hooks/useModal';
import {useNumberInput} from '@/common/hooks/useNumberInput';
import {formatTokenValue} from '@/common/model/formatters';
import {useMyMemberships} from '@/memberships/hooks/useMyMemberships';
import {SwitchMemberModalCall} from '@/memberships/modals/SwitchMemberModal';

export const ContributeFundsModal = () => {
  const {t} = useTranslation('bounty');
  const {modalData: { bounty }, hideModal, showModal} = useModal<BountyContributeFundsModalCall>()
  const { api, isConnected } = useApi();
  const minFundingLimit = api?.consts.bounty.minFundingLimit.toNumber() ?? 0;
  const {active: activeMember} = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const [amount, setAmount] = useNumberInput(6, minFundingLimit);
  const [state, send] = useMachine(contributeFundsMachine);
  const [account, setAccount] = useState<Account>();
  const balance = useBalance(account?.address);

  const setStakingAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value), [])

  const valid = useMemo(() => new BN(amount).gten(minFundingLimit) && !!account, [amount, account])

  const setMaxAmount = useCallback(() => {
    balance && setAmount(balance.transferable.toString())
  }, [balance])

  const setHalfAmount = useCallback(() => {
    balance && setAmount(balance.transferable.divn(2).toString())
  }, [balance])
  const transaction = useMemo(() => {
    if (api && isConnected && activeMember) {
      return api.tx.bounty.fundBounty({ Member: activeMember.id }, bounty.id, amount)
    }
  }, [JSON.stringify(activeMember), isConnected])

  const fee = useTransactionFee(activeMember?.controllerAccount, transaction);

  const contribution = useMemo(() => new BN(amount), [amount]);

  const nextStep = useCallback(() => {
    send('NEXT');
  }, [])

  useEffect(() => {
    balance && setAmount(balance.transferable.gten(minFundingLimit) ? String(minFundingLimit) : balance.transferable.toString())
  }, [balance?.transferable.toString(), account?.address])

  useEffect(() => {
    if (state.matches(ContributeFundStates.requirementsVerification)) {
      if (!activeMember) {
        showModal<SwitchMemberModalCall>({modal: 'SwitchMember'})
      } else {
        nextStep();
      }
    }
  }, [state, activeMember?.id])

  if (!activeMember || !transaction || state.matches(ContributeFundStates.requirementsVerification)) {
    return null;
  }

  if (state.matches(ContributeFundStates.success)) {
    return <SuccessModal onClose={hideModal} />
  }

  if (state.matches(ContributeFundStates.error)) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {t('modals.contribute.error')}
      </FailureModal>
    )
  }

  if (state.matches(ContributeFundStates.cancel)) {
    return <FailureModal onClose={hideModal}>{t('common:modals.transactionCanceled')}</FailureModal>
  }

  if(state.matches(ContributeFundStates.transaction)) {
    const service = state.children.transaction;
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <AuthorizeTransactionModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        description={t('modals.contribute.authorizeDescription', {value: formatTokenValue(amount)})}
        buttonLabel={t('modals.contribute.nextButton')}
        contributeAmount={contribution}
      />
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader title={t('modals.contribute.title')} onClick={hideModal}/>
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <Row>
            <InputComponent inputSize="l" label={t('modals.contribute.bountyId')} tooltipText={t('common:lorem')} required inputDisabled>
              <ReadOnlyInput value={bounty.id} readOnly/>
            </InputComponent>
          </Row>
          <Row>
            <InputComponent inputSize="l" label={t('modals.contribute.stakingAccount')} tooltipText={t('common:lorem')} required>
              <SelectAccount onChange={setAccount} selected={account} />
            </InputComponent>
          </Row>
          <Row>
            <TransactionAmount alignItemsToEnd>
              <InputComponent
                label={t('modals.contribute.selectAmount')}
                sublabel={t('modals.contribute.selectAmountSubtitle', {value: formatTokenValue(minFundingLimit)})}
                id="amount-input"
                required
                inputWidth="s"
                units="JOY"
              >
                <InputNumber
                  id="amount-input"
                  value={formatTokenValue(amount)}
                  onChange={setStakingAmount}
                  placeholder="0"
                />
              </InputComponent>
              <AmountButtons>
                <AmountButton size="small" onClick={setHalfAmount}>
                  {t('modals.contribute.halfButton')}
                </AmountButton>
                <AmountButton size="small" onClick={setMaxAmount}>
                  {t('modals.contribute.maxButton')}
                </AmountButton>
              </AmountButtons>
            </TransactionAmount>
          </Row>
          {!isPerpetual(bounty.fundingType) && <Row>
            <FundedRange
              rangeTitle={t('modals.contribute.rangeTitle')}
              rangeValue={bounty.totalFunding.toNumber()}
              maxRangeTitle={t('modals.contribute.maxRangeTitle')}
              maxRangeValue={(bounty.fundingType as FundingLimited).maxAmount.toNumber()}
              minRangeTitle={t('modals.contribute.minRangeTitle')}
              minRangeValue={(bounty.fundingType as FundingLimited).minAmount.toNumber()}
              flat
            />
          </Row>}
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title={t('modals.common.contributeAmount')} value={contribution} />
          <TransactionInfo title={t('modals.common.transactionFee')} value={fee?.transactionFee} tooltipText={t('common:lorem')}/>
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={!valid} onClick={nextStep}>{t('modals.contribute.nextButton')}</ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const ReadOnlyInput = styled(Input)`
  font-family: ${Fonts.Grotesk};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`;
