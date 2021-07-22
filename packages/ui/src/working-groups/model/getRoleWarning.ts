import { WorkerStatusTypename } from '../types'

export function getRoleWarning(status: WorkerStatusTypename) {
  if (status === 'WorkerStatusActive') return undefined
  if (status === 'WorkerStatusLeaving')
    return {
      title: 'Unstaking period',
      content: 'This role is in the unstaking period.',
      isClosable: false,
    }
  return {
    title: 'Role Ended',
    content: 'We are sorry, but this role has already ended.',
    isClosable: false,
  }
}
