import React from 'react'

import { TextBig, TextSmall } from '@/common/components/typography'
import { WorkingGroup } from '@/working-groups/types'

interface Props {
  group: WorkingGroup
}

export const OptionWorkingGroup = ({ group }: Props) => (
  <div>
    <TextBig>{group.name}</TextBig>
    <TextSmall>{group.about}</TextSmall>
  </div>
)
