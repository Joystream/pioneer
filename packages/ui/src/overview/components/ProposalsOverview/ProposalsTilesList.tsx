import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { Loading } from '@/common/components/Loading'
import { Proposal } from '@/proposals/types/proposals'

import { ProposalTile } from './ProposalTile'

interface ListProps {
  proposals: Proposal[]
  isLoading: boolean
}

export const ProposalsTilesList = React.memo(({ proposals, isLoading }: ListProps) => {
  const { t } = useTranslation('overview')
  const tiles = proposals.map((proposal) => <ProposalTile key={proposal.id} proposalId={proposal.id} />)
  return isLoading ? (
    <Loading />
  ) : (
    <ScrollerWrapper>
      <Scroller title={t('proposals.title')} count={proposals.length} items={tiles} />
    </ScrollerWrapper>
  )
})

const ScrollerWrapper = styled.div`
  margin-top: 25px;
`

const Scroller = styled(HorizontalScroller)`
  padding: 24px 10px;
`
