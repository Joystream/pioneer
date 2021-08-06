import { Path } from 'history'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

export type TabsDefinition = [string, Path] | [string, Path, number | undefined]

export const usePageTabs = (tabs: TabsDefinition[]) => {
  const history = useHistory()

  return useMemo(
    () =>
      tabs.map(([title, path, count]) => ({
        title,
        count,
        active: path === history.location.pathname,
        onClick: () => history.push(path),
      })),
    [JSON.stringify(tabs)]
  )
}
