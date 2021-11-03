import { Path } from 'history'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { isNumber } from '@/common/utils'

interface Options {
  count?: number
  hasChanges?: boolean
}

export type TabsDefinition = [string, Path] | [string, Path, number] | [string, Path, Options]

export const usePageTabs = (tabs: TabsDefinition[]) => {
  const history = useHistory()

  return useMemo(
    () =>
      tabs.map(([title, path, countOrOptions]) => {
        let count: number | undefined
        let hasChanges = false

        if (isNumber(countOrOptions)) {
          count = countOrOptions
        } else {
          count = countOrOptions?.count
          hasChanges = !!countOrOptions?.hasChanges
        }

        return {
          title,
          count,
          changes: hasChanges,
          active: path === history.location.pathname,
          onClick: () => history.push(path),
        }
      }),
    [JSON.stringify(tabs)]
  )
}
