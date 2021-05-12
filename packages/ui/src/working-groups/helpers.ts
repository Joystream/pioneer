import { WorkingGroupApplication } from './types/WorkingGroupApplication'
import { WorkerWithDetails } from '@/working-groups/hooks/useMyWorkers'

export function openingTitle(application: WorkingGroupApplication) {
  const position = application.opening.type == 'LEADER' ? 'Leader' : 'Worker'
  const group = application.opening.groupName
  return `${group} ${position}`
}

export function workerRoleTitle(worker: WorkerWithDetails) {
  const position = worker.isLeader ? 'Leader' : 'Worker'
  const group = worker.group.name
  return `${group} ${position}`
}
