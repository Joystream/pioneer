import React from 'react'
import { InviteFormModal } from './InviteFormModal'

interface MembershipModalProps {
  onClose: () => void
}

export function InviteMemberModal({ onClose }: MembershipModalProps) {
  return <InviteFormModal onClose={onClose} />
}
