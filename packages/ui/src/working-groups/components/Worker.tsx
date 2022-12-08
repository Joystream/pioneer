import React, { useCallback } from 'react'
import styled from 'styled-components'

import { ButtonGhost } from '@/common/components/buttons'
import { FileIcon } from '@/common/components/icons/FileIcon'
import { useModal } from '@/common/hooks/useModal'
import { MemberInfo } from '@/memberships/components'
import { ApplicationDetailsModalCall } from '@/working-groups/modals/ApplicationDetailsModal'
import { WorkerBaseInfo } from '@/working-groups/types'

export const Worker = ({ member, applicationId }: WorkerBaseInfo) => {
  const { showModal } = useModal()
  const showApplicationModal = useCallback(() => {
    showModal<ApplicationDetailsModalCall>({
      modal: 'ApplicationDetails',
      data: { applicationId: applicationId },
    })
  }, [applicationId])

  return (
    <WorkerWrap>
      <MemberInfo member={member} isLead={false} />
      <ButtonGhost square size="small" onClick={showApplicationModal}>
        <FileIcon />
      </ButtonGhost>
    </WorkerWrap>
  )
}

const WorkerWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 32px;
  grid-column-gap: 8px;
  align-items: center;
`
