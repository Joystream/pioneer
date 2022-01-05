import { useMachine } from '@xstate/react';
import BN from 'bn.js';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { SelectAccount } from '@/accounts/components/SelectAccount';
import { useBalance } from '@/accounts/hooks/useBalance';
import { Account } from '@/accounts/types';
import { FundedRange } from '@/bounty/components/FundedRange';
import { BountyContributeFundsModalCall } from '@/bounty/modals/ContributeFundsModal/index';
import { contributeFundsMachine } from '@/bounty/modals/ContributeFundsModal/machine';
import { FundingLimited, isPerpetual } from '@/bounty/types/Bounty';
import { ButtonPrimary } from '@/common/components/buttons';
import { Input, InputComponent, InputNumber } from '@/common/components/forms';
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ScrolledModalBody,
  ScrolledModalContainer,
  Row, AmountButtons, AmountButton, TransactionAmount, TransactionInfoContainer
} from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo';
import { Fonts } from '@/common/constants';
import { useApi } from '@/common/hooks/useApi';
import { useModal } from '@/common/hooks/useModal';
import { useNumberInput } from '@/common/hooks/useNumberInput';
import { formatTokenValue } from '@/common/model/formatters';
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships';
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal';

export const ContributeFundsModal = () => {
  const {t} = useTranslation('bounty');
  const {modalData: { bounty }, hideModal, showModal} = useModal<BountyContributeFundsModalCall>()
  const { api } = useApi();
  const minFundingLimit = api?.consts.bounty.minFundingLimit.toNumber() ?? 0;
  const {active: activeMember} = useMyMemberships()
  const [amount, setAmount] = useNumberInput(6, minFundingLimit);
  const [state, send] = useMachine(contributeFundsMachine);
  const [account, setAccount] = useState<Account>();
  const balance = useBalance(account?.address);

  const setStakingAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value), [])

  const valid = useMemo(() => new BN(amount).gten(minFundingLimit), [amount])

  const setMaxAmount = useCallback(() => {
    balance && setAmount(balance.transferable.toString())
  }, [balance])

  const setHalfAmount = useCallback(() => {
    balance && setAmount(balance.transferable.divn(2).toString())
  }, [balance])

  const transactionInfo = useMemo(() => ({
    contribution: new BN(amount),
    fee: new BN(999),
  }), [amount])

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (!activeMember) {
        showModal<SwitchMemberModalCall>({modal: 'SwitchMember'})
      } else {
        send('NEXT')
      }
    }
  }, [state, activeMember?.id])

  if (!activeMember || state.matches('requirementsVerification')) {
    return null;
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
          <TransactionInfo title={t('modals.contribute.contributeAmount')} value={transactionInfo.contribution} />
          <TransactionInfo title={t('modals.contribute.transactionFee')} value={transactionInfo.fee} tooltipText={t('common:lorem')}/>
        </TransactionInfoContainer>4
        <ButtonPrimary size="medium" disabled={!valid}>{t('modals.contribute.nextButton')}</ButtonPrimary>
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
