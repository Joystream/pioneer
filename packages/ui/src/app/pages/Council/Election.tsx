import React from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ButtonPrimary, ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useElectionStage } from '@/council/hooks/useElectionStage'

import { CouncilTabs } from './components/CouncilTabs'

export const Election = () => {
  const electionStage = useElectionStage()

  if (electionStage === 'inactive') {
    return null
  }

  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Election</PageTitle>
        <ButtonsGroup>
          <CopyButtonTemplate size="medium" textToCopy={window.location.href} icon={<LinkIcon />}>
            Copy link
          </CopyButtonTemplate>
          {electionStage === 'announcing' && <ButtonPrimary size="medium">Announce Candidacy</ButtonPrimary>}
        </ButtonsGroup>
      </PageHeaderRow>
      <CouncilTabs />
    </PageHeaderWrapper>
  )

  const main = <MainPanel></MainPanel>

  return <PageLayout header={header} main={main} />
}
