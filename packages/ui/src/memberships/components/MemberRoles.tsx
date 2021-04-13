import React from 'react'
import styled from 'styled-components'

import { Help } from '../../common/components/Help'
import { Colors } from '../../common/constants'
import { MemberInternal } from '../types'

interface MemberRolesProps {
  max?: number
  size?: 'l' | 'm'
  member: MemberInternal
}

export const MemberRoles = ({ size, max }: MemberRolesProps) => {
  const roles = [
    { abbreviation: 'SP', help: 'Lorem ipsum...' },
    { abbreviation: 'FM', help: 'Lorem ipsum...' },
    { abbreviation: 'FL', help: 'Lorem ipsum...' },
    { abbreviation: 'CC', help: 'Lorem ipsum...' },
    { abbreviation: 'SL', help: 'Lorem ipsum...' },
    { abbreviation: 'FL', help: 'Lorem ipsum...' },
    { abbreviation: 'AA', help: 'Lorem ipsum...' },
    { abbreviation: 'BB', help: 'Lorem ipsum...' },
  ]

  const rolesToDisplay = max ? roles.slice(0, max) : roles
  const hiddenRoles = roles.length - rolesToDisplay.length

  return (
    <MemberRolesWrapper>
      {rolesToDisplay.map(({ abbreviation, help }) => (
        <MemberRoleHelp memberRole={abbreviation} helperText={help} size={size} />
      ))}
      {hiddenRoles > 0 && <MemberRoleHelp memberRole={`+${hiddenRoles}`} helperText={''} size={size} />}
    </MemberRolesWrapper>
  )
}

export const MemberRoleHelp = styled(Help)`
  background-color: ${Colors.Black[100]};
  color: ${Colors.Black[600]};
  border-color: ${Colors.Black[100]};

  &:hover,
  &:focus {
    background-color: ${Colors.Blue[500]};
    border-color: ${Colors.Blue[500]};
    color: ${Colors.Black[25]};
  }
`

export const MemberRolesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${MemberRoleHelp} {
    margin-right: 4px;
    margin-bottom: 4px;
  }
`
