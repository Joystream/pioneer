import React from 'react'
import styled from 'styled-components'

import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface RuntimeUpgradeParameters {
  blob?: string
}

interface RuntimeUpgradeProps extends RuntimeUpgradeParameters {
  setBlob: (blob: string) => void
}

export const RuntimeUpgrade = ({ blob, setBlob }: RuntimeUpgradeProps) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Runtime upgrade</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="Amount" tight units="JOY" required>
            <DropZone onChange={() => setBlob('')}>{blob}</DropZone>
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

const DropZone = styled.div`
  border: 1px dotted ${Colors.Black['200']};
`
