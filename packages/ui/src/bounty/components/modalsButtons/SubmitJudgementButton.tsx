import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import {BountyHeaderButtonsProps} from '@/bounty/components/BountyPreviewHeader/types';
import { SubmitJudgementModalCall } from '@/bounty/modals/SubmitJudgementModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

export const SubmitJudgementButton = React.memo(({ bounty }: BountyHeaderButtonsProps) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()

  const openSubmitJudgementModal = useCallback(() => {
    showModal<SubmitJudgementModalCall>({
      modal: 'SubmitJudgementModal',
      data: {
        bounty,
      },
    })
  }, [bounty])

  return (
    <TransactionButton style="primary" size="large" onClick={openSubmitJudgementModal}>
      {t('buttons.submitJudgement')}
    </TransactionButton>
  )
})
