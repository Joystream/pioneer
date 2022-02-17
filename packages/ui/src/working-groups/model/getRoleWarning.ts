import { relativeTime } from '../../common/model/relativeTime'
import { WorkerStatusTypename } from '../types'

export function getRoleWarning(status: WorkerStatusTypename, unstakingEnd?: string) {
  if (status === 'WorkerStatusActive') {
    return undefined
  }

  const remainingTime = unstakingEnd ? relativeTime(unstakingEnd) : 'soon'

  if (status === 'WorkerStatusLeaving') {
    return {
      title: 'Unstaking period',
      content: `This role is in the unstaking period. It will end ${remainingTime}.`,
      isClosable: false,
    }
  }

  return {
    title: 'Role Ended',
    content: 'Your role is now terminated.',
    isClosable: false,
  }
}
