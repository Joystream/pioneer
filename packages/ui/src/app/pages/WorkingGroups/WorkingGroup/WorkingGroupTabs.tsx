import React, { useState } from 'react'

import { Tabs } from '../../../../common/components/page/PageTabs'

export function WorkingGroupTabs() {
  const [isOpeningActive, setOpeningsActive] = useState(true)
  return (
    <Tabs
      tabs={[
        { inner: 'Openings', active: isOpeningActive, onClick: () => setOpeningsActive(true) },
        { inner: 'About', active: false, onClick: () => setOpeningsActive(true) },
        { inner: 'History', active: false, onClick: () => setOpeningsActive(true) },
      ]}
    />
  )
}
