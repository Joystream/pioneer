import { useMockMembers } from './hooks/useMockMembers'
import { useSudoBudget } from './hooks/useSudoBudget'

export const Mocks = () => {
  useMockMembers()
  useSudoBudget()

  return null
}
