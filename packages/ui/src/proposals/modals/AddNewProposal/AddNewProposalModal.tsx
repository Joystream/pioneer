import { ApiRx } from '@polkadot/api'
import React, { useEffect } from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal/index'

export type OpeningParams = Exclude<
  Parameters<ApiRx['tx']['membershipWorkingGroup']['applyOnOpening']>[0],
  string | Uint8Array
>

export const AddNewProposalModal = () => {
  const { active: membership } = useMyMemberships()
  const { hideModal, showModal } = useModal<AddNewProposalModalCall>()

  useEffect(() => {
    if (!membership) {
      showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
    }
  }, [membership?.id])

  return <FailureModal onClose={hideModal}>There was a problem with applying for an opening.</FailureModal>
}
