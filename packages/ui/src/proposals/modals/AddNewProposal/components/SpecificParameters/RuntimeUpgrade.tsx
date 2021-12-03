import React, { useCallback } from 'react'
import { DropEvent } from 'react-dropzone'

import { Dropzone } from '@/common/components/Dropzone'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export interface RuntimeUpgradeParameters {
  runtime?: ArrayBuffer
}

interface RuntimeUpgradeProps extends RuntimeUpgradeParameters {
  setRuntime: (runtime: ArrayBuffer) => void
}

interface ValidatedFile extends File {
  isValidWASM?: boolean
}

const isDragEvent = (event: any): event is React.DragEvent<HTMLElement> => !!event?.dataTransfer
const isChangeEvent = (event: any): event is React.ChangeEvent<HTMLInputElement> => !!event?.target?.files

const getValidatedFiles = async (event: DropEvent): Promise<ValidatedFile[]> => {
  const files = []

  let fileList: FileList | null = null

  if (isDragEvent(event)) {
    fileList = event.dataTransfer.files
  } else if (isChangeEvent(event)) {
    fileList = event.target.files
  }

  if (!fileList) {
    return []
  }

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList.item(i)
    if (file) {
      const isValidWASM = await WebAssembly.validate(await file.arrayBuffer())
      Object.assign(file, { isValidWASM })
      files.push(file)
    }
  }

  return files
}

const validator = (file: ValidatedFile) => {
  if (!file.isValidWASM) {
    return {
      code: 'file-invalid-type',
      message: 'not valid WASM file',
    }
  }

  return null
}

export const RuntimeUpgrade = ({ setRuntime }: RuntimeUpgradeProps) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setRuntime(await acceptedFiles[0].arrayBuffer())
  }, [])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Runtime upgrade</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <Dropzone
          description="Please upload the raw WebAssembly object to be used as the new runtime."
          onDrop={onDrop}
          title="Blob"
          validator={validator}
          getFilesFromEvent={getValidatedFiles}
        />
      </Row>
    </RowGapBlock>
  )
}
