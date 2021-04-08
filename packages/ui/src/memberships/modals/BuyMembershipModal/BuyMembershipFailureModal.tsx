import React from 'react'

import { FailureModal } from '../../../common/components/FailureModal'
import { Member } from '../../types'

interface Props {
  onClose: () => void
  member: Member
}

export const BuyMembershipFailureModal = ({ onClose, member }: Props) => (
  <FailureModal message={`There was a problem with creating a membership for ${member.name}.`} onClose={onClose} />
)
