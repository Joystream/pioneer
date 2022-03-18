import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { BountyCancelModalCall } from '@/bounty/modals/CancelBountyModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const CancelBountyButton = React.memo(({ bounty }: BountyHeaderButtonsProps) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const { members } = useMyMemberships()
  const bountyCancelModal = useCallback(() => {
    showModal<BountyCancelModalCall>({
      modal: 'BountyCancel',
      data: {
        bounty,
        creator: bounty.creator ?? members[0],
      },
    })
  }, [])

  return (
    <TransactionButton style="primary" size="large" onClick={bountyCancelModal}>
      {t('buttons.cancelBounty')}
    </TransactionButton>
  )
})
