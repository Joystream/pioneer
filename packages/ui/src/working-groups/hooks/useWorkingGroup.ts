import { useMemo } from 'react'

import { useWorkingGroups } from './useWorkingGroups'

export function useWorkingGroup(id: string) {
  const { groups } = useWorkingGroups()
  return useMemo(() => groups.find((g) => g.id == id), [groups])
}
