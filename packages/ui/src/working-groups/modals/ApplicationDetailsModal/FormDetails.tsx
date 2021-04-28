import React from 'react'

import { SidePaneTable } from '../../../common/components/SidePane'

interface Props {
  applicationId: string
}

export const FormDetails = React.memo(({ applicationId }: Props) => {
  return <SidePaneTable></SidePaneTable>
})
