import { MemberRole } from './types'

export function memberRoleAbbreviation(role: MemberRole) {
  if (role.groupName === 'Member Role') {
    return 'M'
  }

  return `${role.groupName.charAt(0).toUpperCase()}${role.isLeader ? 'L' : 'W'}`
}

export function memberRoleTitle(role: MemberRole) {
  if (role.groupName === 'Member Role') {
    return role.groupName
  }

  const position = role.isLeader ? 'Leader' : 'Worker'
  const group = role.groupName

  return `${group} ${position}`
}
