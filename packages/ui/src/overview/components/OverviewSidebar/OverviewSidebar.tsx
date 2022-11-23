import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Colors } from '@/common/constants'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { EmptyState } from '@/overview/components/OverviewSidebar/components/EmptyState'
import { MyRoleTile } from '@/overview/components/OverviewSidebar/components/MyRoleTile'
import { MyThreadComponent } from '@/overview/components/OverviewSidebar/components/MyThreadComponent'
import { MyTitleDateTile } from '@/overview/components/OverviewSidebar/components/MyTitleDateTile'
import { ProposalTile } from '@/overview/components/ProposalsOverview/ProposalTile'
import { useOverviewSidebarInformation } from '@/overview/hooks/useOverviewSidebarInformation'
import { useProposals } from '@/proposals/hooks/useProposals'

export const OverviewSidebar = () => {
  const { t } = useTranslation('overview')
  const { active } = useMyMemberships()
  const { informations } = useOverviewSidebarInformation(active?.id)
  const { allCount } = useProposals({ status: 'active', filters: { stage: 'deciding' } })

  return (
    <Container>
      <RowGapBlock gap={22}>
        {(informations?.roles.length || informations?.isCouncil) && (
          <HorizontalScroller
            items={
              <>
                {informations?.isCouncil && (
                  <MyRoleTile role={t('sidebar.roles.council')} isLead={false} pendingProposals={allCount} />
                )}
                {informations?.roles.map((role) => (
                  <MyRoleTile key={role.role} {...role} />
                ))}
              </>
            }
            title={t('sidebar.sections.myRoles')}
            count={informations?.roles.length}
          />
        )}
        {informations?.applications.length ? (
          <HorizontalScroller
            items={informations.applications.map((application) => (
              <MyTitleDateTile
                key={application.expectedEndingDate}
                title={`${application.group} Working Group`}
                type="application"
                duration={application.expectedEndingDate}
              />
            ))}
            title={t('sidebar.sections.myApplications')}
            count={informations?.applications.length}
          />
        ) : (
          <EmptyState type="application" />
        )}

        {informations?.candidatures.length ? (
          <HorizontalScroller
            items={informations.candidatures.map((candidacy) => (
              <MyTitleDateTile key={candidacy.id} title={candidacy.title} type="election" />
            ))}
            title={t('sidebar.sections.myCandidacies')}
            count={informations?.candidatures.length}
          />
        ) : (
          <EmptyState type="candidacies" />
        )}

        {informations?.proposals.length ? (
          <HorizontalScroller
            items={informations.proposals.map((proposalId) => (
              <ProposalTile key={proposalId} proposalId={proposalId} />
            ))}
            title={t('sidebar.sections.myProposals')}
          />
        ) : (
          <EmptyState type="proposals" />
        )}

        {informations?.threads.length ? (
          <HorizontalScroller
            items={informations.threads.map((thread) => (
              <MyThreadComponent {...thread} />
            ))}
            title={t('sidebar.sections.myThreads')}
            count={informations?.threads.length}
          />
        ) : (
          <EmptyState type="forum" />
        )}
      </RowGapBlock>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  padding: 32px 24px 30px;
  background-color: ${Colors.Black[50]};
  border: 1px solid ${Colors.Black[200]};
`
