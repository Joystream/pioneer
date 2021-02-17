import React from 'react'
import styled from 'styled-components'
import { Member } from '../common/types'
import { Avatar } from './Avatar'
import { Text } from './typography'

interface Props {
  member: Member
}

export const MemberInfo = ({ member }: Props) => {
  return (
    <>
      <div>
        <Avatar avatarURI={member.avatarURI} />
        <MemberHandle>{member.handle}</MemberHandle>
        <Text size={2}>{member.name}</Text>
      </div>
    </>
  )
}

const MemberHandle = styled.p`
  font-weight: bold;
  cursor: pointer;
`
