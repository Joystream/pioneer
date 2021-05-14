import { MemberRole } from './types'

export function memberRoleAbbreviation(role: MemberRole) {
  return `${role.groupName.charAt(0).toUpperCase()}${role.isLeader ? 'L' : 'W'}`
}

export function memberRoleTitle(role: MemberRole) {
  const position = role.isLeader ? 'Leader' : 'Worker'
  const group = role.groupName

  return `${group} ${position}`
}
