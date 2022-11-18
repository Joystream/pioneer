import React, { useCallback } from 'react'
import { DropEvent } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

import { FileDropzone } from '@/common/components/FileDropzone'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

interface ValidatedFile extends File {
  isValidWASM?: boolean
}

const MAX_FILE_SIZE = 3 * 1024 * 1024

const isDragEvent = (event: any): event is React.DragEvent<HTMLElement> => !!event?.dataTransfer
const isChangeEvent = (event: any): event is React.ChangeEvent<HTMLInputElement> => !!event?.target?.files

export const getValidatedFiles = async (event: DropEvent): Promise<ValidatedFile[]> => {
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

export const validator = (file: ValidatedFile) => {
  if (!file.isValidWASM) {
    return {
      code: 'file-invalid-type',
      message: 'not valid WASM file',
    }
  }

  return null
}

export const RuntimeUpgrade = () => {
  const { setValue } = useFormContext()
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setValue('runtimeUpgrade.runtime', await acceptedFiles[0].arrayBuffer())
    }
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
        <FileDropzone
          title="Blob"
          subtitle=""
          accept="application/wasm"
          maxFiles={1}
          maxSize={MAX_FILE_SIZE}
          multiple={false}
          getFilesFromEvent={getValidatedFiles}
          validator={validator}
          onDrop={onDrop}
        />
      </Row>
    </RowGapBlock>
  )
}
