import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { FileDropzone } from '@/common/components/FileDropzone/FileDropzone'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { maybeDecompressRuntimeBlob } from '@/common/utils/crypto/worker'
import { asArrayBuffer } from '@/common/utils/file'

interface ValidatedFile extends File {
  isValidWASM?: boolean
}

const MAX_FILE_SIZE = 3 * 1024 * 1024

const getValidatedFiles = async (files: File[]): Promise<ValidatedFile[]> => {
  const transformedFiles: ValidatedFile[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file) {
      const blob = await asArrayBuffer(file)
      const uncompressedRuntime = await maybeDecompressRuntimeBlob(blob)
      const isValidWASM = WebAssembly.validate(uncompressedRuntime)
      Object.assign(file, { isValidWASM })
      // Original file (not the decompressed one)
      transformedFiles.push(file as ValidatedFile)
    }
  }
  return transformedFiles
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

export const RuntimeUpgrade = () => {
  const { setValue, trigger } = useFormContext()

  const onDrop = useCallback(async ([acceptedFile]: File[]) => {
    if (acceptedFile) {
      setValue('runtimeUpgrade.runtime', acceptedFile)
      trigger('runtimeUpgrade.runtime')
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
          id="runtime-upgrade-input"
          title="Blob"
          subtitle=""
          accept="application/wasm"
          maxFiles={1}
          maxSize={MAX_FILE_SIZE}
          multiple={false}
          getFilesFromEvent={getValidatedFiles}
          validator={validator}
          onDrop={onDrop}
          isRequired
        />
      </Row>
    </RowGapBlock>
  )
}
