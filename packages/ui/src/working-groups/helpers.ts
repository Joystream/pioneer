import { WorkerWithDetails } from '@/working-groups/types'

import { WorkingGroupApplication } from './types/WorkingGroupApplication'
import { capitalizeFirstLetter } from '@/common/helpers'

export function openingTitle(application: WorkingGroupApplication) {
  const position = application.opening.type == 'LEADER' ? 'Leader' : 'Worker'
  const group = capitalizeFirstLetter(application.opening.groupName)

  return `${group} ${position}`
}

export function workerRoleTitle(worker: WorkerWithDetails) {
  const position = worker.isLeader ? 'Leader' : 'Worker'
  const group = capitalizeFirstLetter(worker.group.name)

  return `${group} ${position}`
}
