import { capitalizeFirstLetter, nameMapping } from '@/common/helpers'

import { MemberRole } from './types'

export function memberRoleAbbreviation(role: MemberRole) {
  if (role.groupName === 'Member Role') {
    return 'M'
  }

  return `${nameMapping(role.groupName).charAt(0).toUpperCase()}${role.isLead ? 'L' : 'W'}`
}

export function memberRoleTitle(role: MemberRole) {
  if (role.groupName === 'Member Role') {
    return role.groupName
  }

  const position = role.isLead ? 'Lead' : 'Worker'
  const group = capitalizeFirstLetter(nameMapping(role.groupName))

  return `${group} ${position}`
}
