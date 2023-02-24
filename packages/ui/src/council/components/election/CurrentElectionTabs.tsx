import React from 'react'

import { TabProps, Tabs } from '@/common/components/Tabs'
import { ElectionStage } from '@/council/types/Election'

export type AnnouncingStageTab = 'candidates' | 'myCandidates'
export type VotingStageTab = 'candidates' | 'myVotes'
export type RevealingStageTab = 'results' | 'myVotes' | 'candidates'
export type BlackListStageTab = 'blacklist'

type ElectionTab = AnnouncingStageTab | VotingStageTab | RevealingStageTab | BlackListStageTab

interface ElectionTabsProps {
  stage: Exclude<ElectionStage, 'inactive'> | 'blacklist'
  myCandidates?: number
  myVotes?: number | false
  tab: ElectionTab
  onSetTab: (tab: ElectionTab) => void
}

export const CurrentElectionTabs = ({ stage, myCandidates, myVotes, tab, onSetTab }: ElectionTabsProps) => {
  const tabs: TabProps[] = [
    {
      title: 'Candidates',
      active: tab === 'candidates',
      onClick: () => onSetTab('candidates'),
    },
  ]

  if (stage === 'announcing' && myCandidates) {
    tabs.push({
      title: 'My candidates',
      count: myCandidates,
      active: tab === 'myCandidates',
      onClick: () => onSetTab('myCandidates'),
    })
  }

  if (stage === 'blacklist' && myCandidates) {
    tabs.push({
      title: 'BlackList',
      count: myCandidates,
      active: tab === 'blacklist',
      onClick: () => onSetTab('blacklist'),
    })
  }

  if (stage === 'revealing') {
    tabs.push({
      title: 'Voting results',
      active: tab === 'results',
      onClick: () => onSetTab('results'),
    })
  }

  if ((stage === 'voting' || stage === 'revealing') && typeof myVotes === 'number') {
    tabs.push({ title: 'My votes', count: myVotes, active: tab === 'myVotes', onClick: () => onSetTab('myVotes') })
  }

  return <Tabs tabs={tabs} tabsSize="xs" />
}
