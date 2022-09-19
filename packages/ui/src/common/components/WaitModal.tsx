import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'

import { WaitingIcon } from './icons/WaitingIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultTextWhite } from './Modal'

interface RequirementProps {
  name: string
  state: boolean
}

export interface WaitModalProps {
  onClose: () => void
  title?: string
  description?: string
  requirementsCheck?: boolean
  requirements?: RequirementProps[]
}

export const WaitModal = ({
  onClose,
  title: baseTitle,
  description: baseDescription,
  requirementsCheck,
  requirements,
}: WaitModalProps) => {
  const { t } = useTranslation()
  const title = requirementsCheck ? t('modals.wait.title') : baseTitle
  const description = requirementsCheck ? t('modals.wait.description') : baseDescription
  return (
    <Modal modalSize="xs" modalHeight="s" isDark onClose={onClose}>
      <ModalHeader icon={<Loading />} title="" onClick={onClose} modalHeaderSize="s" />
      <ResultModalBody>
        <WaitingIcon />
        <ModalTitle as="h4">{title}</ModalTitle>
        <ResultTextWhite>{description}</ResultTextWhite>
        {requirements?.length && (
          <RowGapBlock gap={4}>
            {requirements.map((requirement) => (
              <Requirement key={requirement.name}>
                <ResultTextWhite>{requirement.name}</ResultTextWhite>
                <ResultTextWhite>{requirement.state ? 'Loaded' : 'Loading...'}</ResultTextWhite>
              </Requirement>
            ))}
          </RowGapBlock>
        )}
      </ResultModalBody>
    </Modal>
  )
}

const Requirement = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
