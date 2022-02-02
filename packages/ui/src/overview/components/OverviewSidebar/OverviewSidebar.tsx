import React from 'react'
import styled from 'styled-components'

import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Colors } from '@/common/constants'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { MyRoleTile } from '@/overview/components/OverviewSidebar/components/MyRoleTile'
import { MyTitleDateTile } from '@/overview/components/OverviewSidebar/components/MyTitleDateTile'
import { useOverviewSidebarInformation } from '@/overview/hooks/useOverviewSidebarInformation'

export const OverviewSidebar = () => {
  const { active } = useMyMemberships()
  const { isLoading, informations } = useOverviewSidebarInformation(active?.id || '0')

  return (
    <Container gap={10}>
      <HorizontalScroller
        items={informations?.roles.map((role) => (
          <MyRoleTile {...role} />
        ))}
        title="My roles"
      />
      <HorizontalScroller
        items={informations?.applications.map((application) => (
          <MyTitleDateTile title={application.group} type="application" duration={application.expectedEndingDate} />
        ))}
        title="My applications"
      />
      <HorizontalScroller
        items={informations?.candidatures.map((cycleId) => (
          <MyTitleDateTile title={`Candidate in cycle ${cycleId}`} type="election" />
        ))}
        title="My candidacies"
      />
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
