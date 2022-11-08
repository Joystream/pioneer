import React from 'react'
import styled from 'styled-components'

import { ReportIcon } from '@/common/components/icons/ReportIcon'
import { Tooltip } from '@/common/components/Tooltip'
import { useImageReport } from '@/common/hooks/useImageReport'
import { useModal } from '@/common/hooks/useModal'
import { ReportContentModalCall } from '@/common/modals/ReportContentModal'

interface Props {
  src: string | undefined
  text: string
}

export const ReportImageButton = ({ src, text }: Props) => {
  const { reportFormUrl, sendReport } = useImageReport()
  const { showModal } = useModal()

  if ((!reportFormUrl && !sendReport) || !src) {
    return null
  }

  const showReportModal = () =>
    showModal<ReportContentModalCall>({ modal: 'ReportContentModal', data: { report: src } })

  return (
    <Tooltip hideOnComponentLeave offset={[0, 5]} tooltipText={text}>
      <Button onClick={showReportModal}>
        <StyledReportIcon />
      </Button>
    </Tooltip>
  )
}

const StyledReportIcon = styled(ReportIcon)`
  pointer-events: none;
`

const Button = styled.button`
  height: 30px;
  width: 30px;
  cursor: pointer;
  border: none;
  border-radius: 2px;
  outline: none;
  background-color: #fff;
  display: grid;
  place-items: center;
`
