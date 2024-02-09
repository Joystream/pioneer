import React, { useCallback } from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useModal } from '@/common/hooks/useModal'
import { CreateOpeningModalCall } from '@/working-groups/modals/CreateOpening/types'
import { Worker } from '@/working-groups/types'

export interface CreateOpeningButtonProps {
  worker: Worker
}

export const CreateOpeningButton = ({ worker }: CreateOpeningButtonProps) => {
  const { showModal } = useModal()
  const createOpening = useCallback(
    () => showModal<CreateOpeningModalCall>({ modal: 'CreateOpening', data: { worker } }),
    [worker]
  )

  return (
    <TransactionButton style="primary" size="medium" onClick={createOpening}>
      <PlusIcon />
      Add opening
    </TransactionButton>
  )
}
