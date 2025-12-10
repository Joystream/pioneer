import React from 'react'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { ValidatorsRoutes } from '@/validators/constants/routes'

export const ValidatorsTabs = () => {
  const tabs = usePageTabs([
    ['Validator List', ValidatorsRoutes.list],
    ['My Stakes', ValidatorsRoutes.stakes],
    ['My Bags', ValidatorsRoutes.bags],
    // ['Nominator Dashboard', ValidatorsRoutes.nominator],
  ])

  return <Tabs tabs={tabs} />
}
