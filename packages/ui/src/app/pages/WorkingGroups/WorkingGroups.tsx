import { AnimatePresence } from 'framer-motion'
import React from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ButtonsGroup } from '@/common/components/buttons'
import { HintButton } from '@/common/components/buttons/HintButton'
import { Loading } from '@/common/components/Loading'
import { PageTitle } from '@/common/components/page/PageTitle'
import { VideoHint } from '@/common/components/VideoHint'
import { useToggle } from '@/common/hooks/useToggle'
import { WorkingGroupsList } from '@/working-groups/components/WorkingGroupsList'
import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const WorkingGroups = () => {
  const [isHintVisible, toggleHint] = useToggle(false)
  const { isLoading, groups } = useWorkingGroups()

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageLayout
      header={
        <PageHeaderWrapper>
          <PageHeaderRow>
            <PageTitle>Working Groups</PageTitle>
            <ButtonsGroup>
              <HintButton isActive={isHintVisible} onClick={toggleHint} />
            </ButtonsGroup>
          </PageHeaderRow>
          <WorkingGroupsTabs />
          <AnimatePresence>{isHintVisible && <VideoHint onClose={toggleHint} />}</AnimatePresence>
        </PageHeaderWrapper>
      }
      main={<WorkingGroupsList groups={groups} />}
    />
  )
}
