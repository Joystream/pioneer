import BN from 'bn.js';
import React, { useCallback } from 'react'

import { BountiesLayout } from '@/app/pages/Bounty/components/BountiesLayout'
import { BountiesMain } from '@/app/pages/Bounty/components/BountiesMain'
import { BountiesList } from '@/bounty/components/BountiesList'
import { BountyContributeFundsModalCall } from '@/bounty/modals/ContributeFundsModal';
import { Bounty } from '@/bounty/types/Bounty';
import { ButtonPrimary } from '@/common/components/buttons';
import { useModal } from '@/common/hooks/useModal';

const bounty: Bounty = {
  id: 'bounty 1',
  fundingType: {
    maxAmount: new BN(20000),
    minAmount: new BN(15000),
    maxPeriod: 1000,
  },
  totalFunding: new BN(10000),
} as Bounty;

export const BountiesCurrent = () => {
  const { showModal } = useModal<BountyContributeFundsModalCall>()

  const openModal = useCallback(() => showModal({modal: 'BountyContributeFundsModal', data: { bounty }}), [])

  return (
    <BountiesLayout>
      <ButtonPrimary size={'large'} onClick={openModal}>open modal</ButtonPrimary>
      <BountiesMain />
      <BountiesList />
    </BountiesLayout>
  )
}
