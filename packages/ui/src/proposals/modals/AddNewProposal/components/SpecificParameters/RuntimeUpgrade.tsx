import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import { Label } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface RuntimeUpgradeParameters {
  runtime?: ArrayBuffer
}

interface RuntimeUpgradeProps extends RuntimeUpgradeParameters {
  setRuntime: (runtime: ArrayBuffer) => void
}

const MAX_FILE_SIZE = 3 * 1024 * 124

export const RuntimeUpgrade = ({ setRuntime }: RuntimeUpgradeProps) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setRuntime(await file.arrayBuffer())
  }, [])

  const { isDragActive, getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: '.wasm',
    maxFiles: 1,
    // TODO:consts.proposalsCodex.runtimeUpgradeWasmProposalMaxLength
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  })

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
            <input {...getInputProps()} />
            Drop your file here or click to browse
          </DropZone>
          <TextSmall>Maximum upload file size is 3 MB</TextSmall>
          {!!acceptedFiles.length && (
            <ul>
              {acceptedFiles.map((file) => (
                <AcceptedFile>
                  <strong>{file.name}</strong> ({file.size} B)
                </AcceptedFile>
              ))}
            </ul>
          )}
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

const DropZone = styled.div<{ isDragActive: boolean }>`
  border: 1px dotted;
  border-color: ${({ isDragActive }) => (isDragActive ? Colors.Blue[200] : Colors.Black[200])};
  padding: 1em;
  text-align: center;
`

const AcceptedFile = styled.div`
  background: ${Colors.Blue[100]};
  padding: 1em;
`
