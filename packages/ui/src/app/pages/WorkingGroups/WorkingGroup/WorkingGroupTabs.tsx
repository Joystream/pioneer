import React, { useState } from 'react'

import { PageTabs } from '../../../../common/components/page/PageTabs'

export function WorkingGroupTabs() {
  const [isOpeningActive, setOpeningsActive] = useState(false)
  return (
    <PageTabs
      tabs={[
        { title: 'Openings', active: isOpeningActive, onClick: () => setOpeningsActive(true) },
        { title: 'About', active: false, onClick: () => setOpeningsActive(true) },
        { title: 'History', active: false, onClick: () => setOpeningsActive(true) },
      ]}
    />
  )
}
