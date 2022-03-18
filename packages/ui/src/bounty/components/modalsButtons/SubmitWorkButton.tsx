import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { SubmitWorkModalCall } from '@/bounty/modals/SubmitWorkModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

export const SubmitWorkButton = React.memo(({ bounty, validMemberIds }: BountyHeaderButtonsProps) => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const submitWorkModal = useCallback(() => {
    if (!active || !validMemberIds.includes(active.id)) {
      return showModal<SwitchMemberModalCall>({
        modal: 'SwitchMember',
        data: {
          noCreateButton: true,
          membersToShow: validMemberIds,
          originalModalName: 'SubmitWork',
          originalModalData: {
            bounty,
          },
        },
      })
    }

    showModal<SubmitWorkModalCall>({
      modal: 'SubmitWork',
      data: {
        bounty,
      },
    })
  }, [validMemberIds, active])

  return (
    <TransactionButton style="primary" size="large" onClick={submitWorkModal}>
      {t('buttons.submitWork')}
    </TransactionButton>
  )
})
