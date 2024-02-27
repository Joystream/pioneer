import React from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useModal } from '@/common/hooks/useModal'
import { useRoleAccount } from '@/working-groups/hooks/useRoleAccount'
import { CreateOpeningModalCall } from '@/working-groups/modals/CreateOpening/types'
import { WorkingGroup } from '@/working-groups/types'

type CreateOpeningButtonProps = {
  name: string
  group: WorkingGroup | undefined
}

export const CreateOpeningButton = ({ name, group }: CreateOpeningButtonProps) => {
  const { showModal } = useModal()

  const { roleAccount: leadAccount } = useRoleAccount({ isLead_eq: true, isActive_eq: true, group: { name_eq: name } })
  const { allAccounts } = useMyAccounts()
  const isLead = allAccounts.some((account) => account.address === leadAccount)

  if (!group || !leadAccount || !isLead) {
    return null
  }

  return (
    <TransactionButton
      style="primary"
      size="medium"
      onClick={() => showModal<CreateOpeningModalCall>({ modal: 'CreateOpening', data: { group, leadAccount } })}
    >
      <PlusIcon />
      Add opening
    </TransactionButton>
  )
}
