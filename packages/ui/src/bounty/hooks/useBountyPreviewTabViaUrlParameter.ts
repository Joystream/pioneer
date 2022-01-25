import { useEffect } from 'react'

import { CommonTabsState } from '@/bounty/components/tabsSets/CommonTabs'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'

export const useBountyPreviewTabViaUrlParameter = (callback: (tab: CommonTabsState) => void) => {
  const query = useRouteQuery()
  const tab = query.get('tab')

  useEffect(() => {
    if (tab) {
      callback(tab as CommonTabsState)
    }
  }, [tab])
}
