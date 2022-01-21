import { useEffect } from 'react'

import { ExpiredTabsState } from '@/bounty/components/BountyExpired/ExpiredTabs'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'

export const useBountyPreviewTabViaUrlParameter = (callback: (tab: ExpiredTabsState) => void) => {
  const query = useRouteQuery()
  const tab = query.get('tab')

  useEffect(() => {
    if (tab) {
      callback(tab as ExpiredTabsState)
    }
  }, [tab])
}
