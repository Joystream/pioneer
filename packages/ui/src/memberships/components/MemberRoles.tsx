import React from 'react'
import styled from 'styled-components'

import { Help } from '../../common/components/Help'
import { Colors } from '../../common/constants'
import { Member } from '../types'

interface MemberRolesProps {
  max?: number
  size?: 'l' | 'm'
  member: Member
  wrapable?: boolean
}

export const MemberRoles = ({ size, max, wrapable }: MemberRolesProps) => {
  const roles = [
    { abbreviation: 'SP', help: 'Lorem ipsum...' },
    { abbreviation: 'FM', help: 'Lorem ipsum...' },
    { abbreviation: 'FL', help: 'Lorem ipsum...' },
    { abbreviation: 'CC', help: 'Lorem ipsum...' },
    { abbreviation: 'SL', help: 'Lorem ipsum...' },
    { abbreviation: 'AA', help: 'Lorem ipsum...' },
    { abbreviation: 'BB', help: 'Lorem ipsum...' },
  ]

  const rolesToDisplay = max ? roles.slice(0, max) : roles
  const hiddenRoles = roles.length - rolesToDisplay.length

  return (
    <>
      {wrapable ? (
        <MemberRolesWrapperWrapable>
          {rolesToDisplay.map(({ abbreviation, help }) => (
            <MemberRoleHelp key={abbreviation} memberRole={abbreviation} helperText={help} size={size} />
          ))}
          {hiddenRoles > 0 && <MemberRoleHelp memberRole={`+${hiddenRoles}`} helperText={''} size={size} />}
        </MemberRolesWrapperWrapable>
      ) : (
        <MemberRolesWrapper>
          {rolesToDisplay.map(({ abbreviation, help }) => (
            <MemberRoleHelp key={abbreviation} memberRole={abbreviation} helperText={help} size={size} />
          ))}
          {hiddenRoles > 0 && <MemberRoleHelp memberRole={`+${hiddenRoles}`} helperText={''} size={size} />}
        </MemberRolesWrapper>
      )}
    </>
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

export const MemberRolesWrapperWrapable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16px, 24px));
  grid-row-gap: 4px;
  grid-column-gap: 4px;
`

export const MemberRolesWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  width: fit-content;
  grid-column-gap: 4px;
`
