import { ZstdInit } from '@oneidentity/zstd-js/decompress'
import React, { useCallback, useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { FileDropzone } from '@/common/components/FileDropzone/FileDropzone'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { FilesContext } from '@/proposals/modals/AddNewProposal/FilesContext'

interface ValidatedFile extends File {
  isValidWASM?: boolean
}

const MAX_FILE_SIZE = 3 * 1024 * 1024

// https://github.com/paritytech/substrate/blob/master/primitives/maybe-compressed-blob/src/lib.rs
// Convert blob to Buffer type to make it easier work with (compare|subarray),
// although it is adding a copy step.
// Looks for 8-byte magic prefix in blob to determine if it is compressed with zstd algorithm.
// If compressed, strips the prefix and decompresses remaining bytes returning
// decompressed value, otherwise returns original blob.
const maybeDecompressRuntimeBlob = async (blob: ArrayBuffer): Promise<Buffer | Uint8Array> => {
  const ZSTD_PREFIX = Buffer.from([82, 188, 83, 118, 70, 219, 142, 5])
  let wasm: Buffer | Uint8Array = Buffer.from(blob)
  const prefix = wasm.subarray(0, 8)
  const isCompressed = Buffer.compare(prefix, ZSTD_PREFIX) === 0
  if (isCompressed) {
    const { ZstdStream } = await ZstdInit()
    // strip the prefix and decompress the rest
    wasm = ZstdStream.decompress(wasm.subarray(8))
  }
  return wasm
}

const getValidatedFiles = async (files: File[]): Promise<ValidatedFile[]> => {
  const transformedFiles: ValidatedFile[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file) {
      const uncompressedRuntime = await maybeDecompressRuntimeBlob(await file.arrayBuffer())
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
  const setFiles = useContext(FilesContext)

  const onDrop = useCallback(async ([acceptedFile]: File[]) => {
    if (acceptedFile) {
      const arrayBuffer = await acceptedFile.arrayBuffer()
      setFiles([new Uint8Array(arrayBuffer)])
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
