import React from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import { Label } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface RuntimeUpgradeParameters {
  blob?: string
}

interface RuntimeUpgradeProps extends RuntimeUpgradeParameters {
  setBlob: (blob: string) => void
}

export const RuntimeUpgrade = ({ blob, setBlob }: RuntimeUpgradeProps) => {
  const { isDragActive, getRootProps } = useDropzone()

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
          <Label isRequired>Blob</Label>
          <TextSmall>Please upload the raw WebAssembly object to be used as the new runtime.</TextSmall>
          <DropZone {...getRootProps()} isDragActive={isDragActive}>
            Drop your file here or browse
          </DropZone>
          <TextSmall>Maximum upload file size is 3 MB</TextSmall>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

const DropZone = styled.div<{ isDragActive: boolean }>`
  border: 1px dotted;
  border-color: ${({ isDragActive }) => (isDragActive ? Colors.Blue['200'] : Colors.Black['200'])};
  padding: 1em;
  text-align: center;
`
