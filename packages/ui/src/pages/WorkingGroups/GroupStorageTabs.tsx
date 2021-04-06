import React, { useState } from 'react'

import { Tabs } from '../../components/page/PageTabs'

export function GroupStorageTabs() {
  const [isOpeningActive, setOpeningsActive] = useState(false)
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
