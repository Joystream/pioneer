import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { BountyContributeFundsModalCall } from '@/bounty/modals/ContributeFundsModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

export const ContributeFundsButton = React.memo(({ bounty, validMemberIds }: BountyHeaderButtonsProps) => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const contributeFundsModal = useCallback(() => {
    if (!active || !validMemberIds.includes(active.id)) {
      return showModal<SwitchMemberModalCall>({
        modal: 'SwitchMember',
        data: {
          noCreateButton: true,
          membersToShow: validMemberIds,
          originalModalName: 'BountyContributeFundsModal',
          originalModalData: {
            bounty,
          },
        },
      })
    }

    showModal<BountyContributeFundsModalCall>({
      modal: 'BountyContributeFundsModal',
      data: {
        bounty,
      },
    })
  }, [validMemberIds, active])

  return (
    <TransactionButton style="primary" size="large" onClick={contributeFundsModal}>
      {t('buttons.contributeFunds')}
    </TransactionButton>
  )
})
