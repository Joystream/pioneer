import { Path } from 'history'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

type TabsDefinition = [string, Path]

export const usePageTabs = (tabs: TabsDefinition[]) => {
  const history = useHistory()

  return useMemo(
    () =>
      tabs.map(([title, path]) => ({
        title,
        active: path === history.location.pathname,
        onClick: () => history.push(path),
      })),
    [JSON.stringify(tabs)]
  )
}
