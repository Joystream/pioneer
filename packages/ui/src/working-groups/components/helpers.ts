import { WorkingGroupApplication } from '../types/WorkingGroupApplication'

export function openingTitle(application: WorkingGroupApplication) {
  const position = application.opening.type == 'LEADER' ? 'Leader' : 'Worker'
  const group = application.opening.groupName
  return `${group} ${position}`
}
