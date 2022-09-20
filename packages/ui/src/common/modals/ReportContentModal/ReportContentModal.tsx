import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { ExternalLinkButtonPrimary } from '@/common/components/buttons/LinkButtons'
import { InputComponent, InputText } from '@/common/components/forms'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { Loading } from '@/common/components/Loading'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'
import { useImageReport } from '@/common/hooks/useImageReport'
import { useModal } from '@/common/hooks/useModal'
import { useToggle } from '@/common/hooks/useToggle'
import { ModalWithDataCall } from '@/common/providers/modal/types'

export type ReportContentModalCall = ModalWithDataCall<'ReportContentModal', { report: string }>

export const ReportContentModal = () => {
  const { t } = useTranslation()
  const [isOpen, toggle] = useToggle()
  const [isReporting, setIsReporting] = useState(false)
  const { reportFormUrl, sendReport, userReportedImages } = useImageReport()
  const {
    hideModal,
    modalData: { report },
  } = useModal<ReportContentModalCall>()

  const isAlreadyReported = useMemo(() => userReportedImages.includes(report), [userReportedImages])

  const onReporting = useCallback(async () => {
    setIsReporting(true)
    await sendReport?.(report)
    hideModal()
  }, [])

  return (
    <Modal modalSize="m" modalHeight="s" onClose={hideModal}>
      <ModalHeader onClick={hideModal} title={t('modals.reportContent.title')} icon={<AlertSymbol />} />
      <ModalBody>
        {isAlreadyReported ? (
          <Warning title={t('modals.reportContent.alreadyReported')} isClosable={false} />
        ) : (
          <TextMedium>{t('modals.reportContent.content')}</TextMedium>
        )}
        <InputComponent label={t('modals.reportContent.label')} textToCopy={report} copy>
          <InputText value={report} disabled />
        </InputComponent>
        <Preview>
          <ToggleButton>
            <h5>{t('modals.reportContent.preview')}</h5>
            <DropDownButton isDropped={isOpen} onClick={toggle} />
          </ToggleButton>

          <DropDownToggle isDropped={isOpen}>
            <Image src={report} />
          </DropDownToggle>
        </Preview>
      </ModalBody>
      <ModalFooter>
        {reportFormUrl ? (
          <ExternalLinkButtonPrimary
            size="medium"
            href={reportFormUrl(report)}
            target="_blank"
            disabled={isAlreadyReported}
          >
            {t('modals.reportContent.proceedButton')}
          </ExternalLinkButtonPrimary>
        ) : (
          <ButtonPrimary size="medium" onClick={onReporting} disabled={isReporting || isAlreadyReported}>
            {isReporting ? <Loading /> : t('modals.reportContent.proceedButton')}
          </ButtonPrimary>
        )}
      </ModalFooter>
    </Modal>
  )
}

const Preview = styled.label`
  position: relative;
  cursor: pointer;
`
const ToggleButton = styled.div`
  align-items: center;
  display: flex;
`
const Image = styled.img`
  align-self: flex-start;
  max-width: 100%;
  object-fit: contain;
`
