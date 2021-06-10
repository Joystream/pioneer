import React, { useCallback } from 'react'
import styled from 'styled-components'

import { ButtonGhost } from '@/common/components/buttons'
import { FileIcon } from '@/common/components/icons/FileIcon'
import { useModal } from '@/common/hooks/useModal'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'
import { ApplicationDetailsModalCall } from '@/working-groups/modals/ApplicationDetailsModal'

interface WorkerProps {
  member: Member
  applicationId: string
  isLeader?: boolean
}

export const Worker = ({ member, applicationId, isLeader }: WorkerProps) => {
  const { showModal } = useModal()
  const showApplicationModal = useCallback(() => {
    showModal<ApplicationDetailsModalCall>({
      modal: 'ApplicationDetails',
      data: { applicationId: applicationId },
    })
  }, [applicationId])

  return (
    <WorkerWrap>
      <MemberInfo member={member} isLeader={isLeader} />
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
`
