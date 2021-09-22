import React from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useElectionState } from '@/council/hooks/useElectionState'

import { CouncilTabs } from './components/CouncilTabs'

export const Election = () => {
  const electionState = useElectionState()

  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Council</PageTitle>
        <ButtonsGroup>
          <CopyButtonTemplate size="medium" textToCopy={window.location.href} icon={<LinkIcon />}>
            Copy link
          </CopyButtonTemplate>
        </ButtonsGroup>
      </PageHeaderRow>
      <CouncilTabs />
    </PageHeaderWrapper>
  )

  const main = <MainPanel></MainPanel>

  return <PageLayout header={header} main={main} />
}
