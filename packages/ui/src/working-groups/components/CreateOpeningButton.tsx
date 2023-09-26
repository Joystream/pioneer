import React, { useCallback } from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useModal } from '@/common/hooks/useModal'
import { CreateOpeningModalCall } from '@/working-groups/modals/CreateOpening/types'
import { GroupIdName } from '@/working-groups/types'

export interface CreateOpeningButtonProps {
  group?: GroupIdName
}

export const CreateOpeningButton = ({ group }: CreateOpeningButtonProps) => {
  const { showModal } = useModal()
  const createOpening = useCallback(
    () => showModal<CreateOpeningModalCall>({ modal: 'CreateOpening', data: { group } }),
    [group]
  )

  return (
    <TransactionButton style="primary" size="medium" onClick={createOpening}>
      <PlusIcon />
      Add opening
    </TransactionButton>
  )
}
