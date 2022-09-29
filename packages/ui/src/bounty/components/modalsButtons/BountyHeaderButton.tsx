import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ModalNames } from '@/app/GlobalModals'
import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

export const BountyHeaderButton = <T extends ModalNames>({
  modal,
  modalData,
  validMemberIds,
  text,
}: BountyHeaderButtonsProps<T>) => {
  const { active } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const withdrawWorkEntryModal = useCallback(() => {
    if (!active || !validMemberIds.includes(active.id)) {
      return showModal<SwitchMemberModalCall>({
        modal: 'SwitchMember',
        data: {
          noCreateButton: true,
          membersToShow: validMemberIds,
          originalModalName: modal,
          originalModalData: modalData,
        },
      })
    }

    showModal({
      modal: modal,
      data: modalData,
    })
  }, [validMemberIds, active])

  return (
    <TransactionButton style="secondary" size="large" onClick={withdrawWorkEntryModal}>
      <PlusIcon />
      {t(text)}
    </TransactionButton>
  )
}
