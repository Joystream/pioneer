import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyCancelModalCall } from '@/bounty/modals/CancelBountyModal'
import { Bounty } from '@/bounty/types/Bounty'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { Member } from '@/memberships/types'

interface Props {
  bounty: Bounty
  creator: Member
}

export const CancelBountyButton = React.memo(({ bounty, creator }: Props) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const bountyCancelModal = useCallback(() => {
    showModal<BountyCancelModalCall>({
      modal: 'BountyCancel',
      data: {
        bounty,
        creator,
      },
    })
  }, [])

  return (
    <TransactionButton style="primary" size="large" onClick={bountyCancelModal}>
      {t('buttons.cancelBounty')}
    </TransactionButton>
  )
})
