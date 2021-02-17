import React from 'react'
import { ButtonGhostMediumSquare } from '../../../components/buttons'
import { MemberInfo } from '../../../components/MemberInfo'
import { Member } from '../../../modals/AddMembershipModal/MembershipFormModal'

interface MemberProps {
  member: Member
}

export const MemberItem = ({ member }: MemberProps) => {
  return (
    <div>
      <MemberInfo member={member} />
      <ButtonGhostMediumSquare>Edit</ButtonGhostMediumSquare>
    </div>
  )
}
