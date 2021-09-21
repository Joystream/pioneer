import React, { useCallback } from 'react'

import { useModal } from '@/common/hooks/useModal'
import { MemberModalCall } from '@/memberships/components/MemberProfile'

export const useShowMemberModal = (id: string) => {
  const { showModal } = useModal()
  return useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      event?.stopPropagation()
      showModal<MemberModalCall>({ modal: 'Member', data: { id } })
    },
    [id]
  )
}
