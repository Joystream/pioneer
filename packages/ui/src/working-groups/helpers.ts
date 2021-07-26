import { capitalizeFirstLetter } from '@/common/helpers'
import { Worker } from '@/working-groups/types'

import { WorkingGroupApplication } from './types/WorkingGroupApplication'

export function openingTitle(application: WorkingGroupApplication) {
  const position = application.opening.type == 'LEAD' ? 'Lead' : 'Worker'
  const group = capitalizeFirstLetter(application.opening.groupName)

  return `${group} ${position}`
}

export function workerRoleTitle(worker: Worker) {
  const position = worker.isLead ? 'Lead' : 'Worker'
  const group = capitalizeFirstLetter(worker.group.name)

  return `${group} ${position}`
}
