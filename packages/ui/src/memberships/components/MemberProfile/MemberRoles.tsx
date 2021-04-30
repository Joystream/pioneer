import React from 'react'
import styled from 'styled-components'

import { RowGapBlock } from '../../../common/components/page/PageContent'
import { TextMedium } from '../../../common/components/typography'
import { Member } from '../../types'

import { MemberRoleToggle } from './MemberRoleToggle'

export const MemberSideRoles = ({ member }: { member: Member }) => {
  return (
    <RolesDisplay gap={8}>
      {member.roles ? (
        <MemberRoleToggle member={member} role="Some role name" />
      ) : (
        <TextMedium light>This profile has no roles.</TextMedium>
      )}
    </RolesDisplay>
  )
}

const RolesDisplay = styled(RowGapBlock)`
  padding: 24px;
`
