import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { WorkingGroupAndDescription as WorkingGroupAndDescription_ } from '@/working-groups/components/CreateOpening/WorkingGroupAndDescription'
import { GroupIdName } from '@/working-groups/types'

interface Props {
  groupId?: GroupIdName
}

export const WorkingGroupAndDescription = ({ groupId }: Props) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Create Working Group Lead Opening</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <WorkingGroupAndDescription_ groupId={groupId} />
      </Row>
    </RowGapBlock>
  )
}
