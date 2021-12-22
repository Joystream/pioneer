import React, { useEffect } from 'react'
import styled from 'styled-components'

import { FileIcon } from '@/common/components/icons'
import { Link } from '@/common/components/Link'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium } from '@/common/components/typography'
import { useRuntimeBytecode } from '@/proposals/hooks/useRuntimeBytecode'

import { downloadFile } from '../../../../../../common/utils/downloadFile'

interface Props {
  label: string
  value: string
}

export const RuntimeBlob = ({ label, value: newBytecodeId }: Props) => {
  const { state, runtimeBase64string, fetch } = useRuntimeBytecode(newBytecodeId)

  const download = () =>
    downloadFile(`bytecode_${newBytecodeId}.wasm`, `data:application/octet-stream;base64,${runtimeBase64string}`)

  useEffect(() => {
    if (state === 'loaded') {
      download()
    }
  }, [state])

  const onClick = () => {
    if (state !== 'loaded') {
      fetch()
    } else {
      download()
    }
  }

  return (
    <Row>
      <RowGapBlock gap={4}>
        <Label>{label}</Label>
        <FileLink onClick={onClick} dark>
          <FileIcon />
          <TextInlineMedium bold value>
            {state === 'loading' ? 'Downloading file...' : 'File Preview'}
          </TextInlineMedium>
        </FileLink>
      </RowGapBlock>
    </Row>
  )
}

export const FileLink = styled(Link)`
  display: flex;
  text-decoration: none;
  & svg {
    margin-right: 4px;
  }
`
