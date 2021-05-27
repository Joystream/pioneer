import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'

export const AddProposalButton = () => (
  <ButtonPrimary size="medium">
    <PlusIcon />
    Add new proposal
  </ButtonPrimary>
)
