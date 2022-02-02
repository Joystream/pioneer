import React from 'react'
import styled from 'styled-components'

import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Colors } from '@/common/constants'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useOverviewSidebarInformation } from '@/overview/hooks/useOverviewSidebarInformation'

export const OverviewSidebar = () => {
  const { active } = useMyMemberships()
  const { isLoading, informations } = useOverviewSidebarInformation(active?.id || '0')

  return (
    <Container gap={15}>
      <HorizontalScroller items={<Placeholder />} title="My roles" />
      <HorizontalScroller items={<Placeholder />} title="My applications" />
      <HorizontalScroller items={<Placeholder />} title="My candidacies" />
      <HorizontalScroller items={<Placeholder />} title="My proposals" />
      <HorizontalScroller items={<Placeholder />} title="My threads" />
    </Container>
  )
}

const Container = styled(RowGapBlock)`
  padding: 30px 0 30px 15px;
  background-color: ${Colors.Black[50]};
  border: 1px solid ${Colors.Black[200]};
  overflow: auto;
`

const Placeholder = styled.div`
  width: 250px;
  height: 150px;
  background-color: brown;
`
