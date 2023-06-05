import React, { useState } from 'react'
import styled from 'styled-components'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { Tabs } from '@/common/components/Tabs'
import { Colors } from '@/common/constants'
import { Overview } from './OverView'
import { Norminators } from './Nominators'
import { RewardHistory } from './RewardHistory'
import { SlashingHistory } from './SlashingHistory'


export function ValidatorDashboardMain() {

  const [IsOverview, setIsOverview] = useState(true);
  const [IsNominators, setIsNominators] = useState(false)
  const [IsRewards, setIsRewards] = useState(false);
  const [IsSlashing, setIsSlashing] = useState(false);

  const tabs = [
    {
      title: 'Overview', onClick: () => {
        setIsNominators(false);
        setIsRewards(false);
        setIsSlashing(false);
        !IsOverview && setIsOverview(true)
      }, active: IsOverview
    },
    {
      title: `Nominators`, onClick: () => {
        setIsOverview(false);
        setIsRewards(false);
        setIsSlashing(false);
        !IsNominators && setIsNominators(true);
      }, active: IsNominators
    },
    {
      title: 'Rewards Histroy', onClick: () => {
        setIsOverview(false);
        setIsSlashing(false);
        setIsNominators(false);
        !IsRewards && setIsRewards(true)
      }, active: IsRewards
    },
    {
      title: `Slashing History `, onClick: () => {
        setIsOverview(false);
        setIsRewards(false);
        setIsNominators(false);
        !IsSlashing && setIsSlashing(true);
      }
      , active: IsSlashing
    },
  ]

  return (
    <ContentWithTabs>
      <Tabs tabsSize="xs" tabs={tabs} />
      <ValidatorDasbaordWarp>
        {IsOverview && <Overview />}
        {IsNominators && <Norminators />}
        {IsRewards && <RewardHistory />}
        {IsSlashing && <SlashingHistory />}
      </ValidatorDasbaordWarp>
    </ContentWithTabs>
  )
}


const ValidatorDasbaordWarp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'accountstablenav'
    'accountslist';
  grid-row-gap: 4px;
  width: 100%;
`
export const ListHeader = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  justify-self: end;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: right;
  user-select: none;
  cursor: pointer;

  &:first-child {
    text-align: left;
    justify-self: start;
  }
`
