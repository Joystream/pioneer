import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { Loading } from '@/common/components/Loading'
import { Proposal } from '@/proposals/types/proposals'

import { ProposalTile } from './ProposalTile'

interface ListProps {
  proposals: Proposal[]
}

export const ProposalsTilesList = React.memo(({ proposals }: ListProps) => {
  const { t } = useTranslation('overview')
  const tiles = proposals.map((proposal) => <ProposalTile key={proposal.id} proposalId={proposal.id} />)
  return !tiles ? (
    <Loading />
  ) : (
    <ScrollerWrapper>
      <Scroller title={t('proposals.title')} count={tiles.length} items={tiles} />
    </ScrollerWrapper>
  )
})

const ScrollerWrapper = styled.div`
  margin-top: 25px;
`

const Scroller = styled(HorizontalScroller)`
  padding: 24px 10px;
`
