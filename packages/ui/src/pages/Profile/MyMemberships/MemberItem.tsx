import React from 'react'
import { Member } from '../../../common/types'
import { ButtonGhostMediumSquare } from '../../../components/buttons'
import { MemberInfo } from '../../../components/MemberInfo'

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
