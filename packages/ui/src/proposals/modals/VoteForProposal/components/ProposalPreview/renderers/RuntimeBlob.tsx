import React, { useEffect } from 'react'
import styled from 'styled-components'

import { FileIcon } from '@/common/components/icons'
import { Link } from '@/common/components/Link'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium } from '@/common/components/typography'
import { useRuntimeBytecode } from '@/proposals/hooks/useRuntimeBytecode'

interface Props {
  label: string
  value: string
}

export const RuntimeBlob = ({ label, value: newBytecodeId }: Props) => {
  const { state, runtimeBase64string, fetch } = useRuntimeBytecode(newBytecodeId)

  useEffect(() => {
    if (state === 'loaded' && runtimeBase64string) {
      downloadFile(newBytecodeId, getDownloadHref(runtimeBase64string))
    }
  }, [state])

  const onClick = () => {
    if (state !== 'loaded') {
      fetch()
    } else {
      runtimeBase64string && downloadFile(newBytecodeId, getDownloadHref(runtimeBase64string))
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

function downloadFile(id: string | undefined, downloadHref: string) {
  const a = document.createElement('a')
  a.download = `bytecode_${id}.wasm`
  a.href = downloadHref
  a.click()
}

function getDownloadHref(base64string: string) {
  return `data:application/octet-stream;base64,${base64string}`
}

export const FileLink = styled(Link)`
  display: flex;
  text-decoration: none;
  & svg {
    margin-right: 4px;
  }
`
