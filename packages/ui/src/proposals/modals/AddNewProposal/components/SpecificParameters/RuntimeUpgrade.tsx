import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled, { css } from 'styled-components'

import { Label } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'

export interface RuntimeUpgradeParameters {
  runtime?: ArrayBuffer
}

interface RuntimeUpgradeProps extends RuntimeUpgradeParameters {
  setRuntime: (runtime: ArrayBuffer) => void
}

interface DragResponseProps {
  isDragActive?: boolean
  isDragAccept?: boolean
  isDragReject?: boolean
}

interface ValidatedFile extends File {
  isValidWASM?: boolean
}

const MAX_FILE_SIZE = 3 * 1024 * 1024

const getValidatedFiles = async (event: any): Promise<ValidatedFile[]> => {
  const files = []

  const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList.item(i)

    const isValidWASM = await WebAssembly.validate(await file.arrayBuffer())
    Object.assign(file, { isValidWASM })
    files.push(file)
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
    if (acceptedFiles.length) {
      setRuntime(await acceptedFiles[0].arrayBuffer())
    }
  }, [])

  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: 'application/wasm',
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    getFilesFromEvent: getValidatedFiles,
    validator,
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
        <RowGapBlock gap={32}>
          <RowGapBlock gap={4}>
            <RowGapBlock gap={12}>
              <RowGapBlock gap={4}>
                <Label isRequired>Blob</Label>
                <TextMedium lighter>Please upload the raw WebAssembly object to be used as the new runtime.</TextMedium>
              </RowGapBlock>
              <DropZone
                {...getRootProps()}
                isDragActive={isDragActive}
                isDragAccept={isDragAccept}
                isDragReject={isDragReject}
              >
                <input {...getInputProps()} />
                <DropZoneText>
                  Drop your file here or <DropZoneTextUnderline>browse</DropZoneTextUnderline>
                </DropZoneText>
              </DropZone>
            </RowGapBlock>
            <TextSmall lighter>Maximum upload file size is 3 MB</TextSmall>
          </RowGapBlock>
          <RowGapBlock gap={8}>
            {acceptedFiles.map((file) => (
              <ReceivedFile key={file.name} valid={true}>
                <AcceptedFileText>
                  <b>{file.name}</b> ({file.size} B) was loaded successfully!
                </AcceptedFileText>
              </ReceivedFile>
            ))}
            {fileRejections.map(({ file, errors }) => (
              <ReceivedFile key={file.name} valid={false}>
                <AcceptedFileText>
                  <b>{file.name}</b> ({file.size} B) was not loaded because of "{errors.map((e) => e.message)}"
                </AcceptedFileText>
              </ReceivedFile>
            ))}
          </RowGapBlock>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

const DropZoneText = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-style: italic;
  color: ${Colors.Black[600]};
  transition: ${Transitions.all};
`

const DropZoneTextUnderline = styled.span`
  font-weight: 700;
  text-decoration: underline;
`

const DropZone = styled.div<DragResponseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: fit-content;
  min-height: 104px;
  border: 1px dotted ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover {
    ${({ isDragActive, isDragAccept, isDragReject }) =>
      !isDragActive &&
      !isDragAccept &&
      !isDragReject &&
      css`
        border-color: ${Colors.Blue[500]};

        ${DropZoneText} {
          color: ${Colors.Blue[500]};
        }
      `};
  }

  ${({ isDragActive }) =>
    isDragActive &&
    css`
      border-color: ${Colors.Blue[400]};

      ${DropZoneText} {
        color: ${Colors.Blue[400]};
      }
    `}
  ${({ isDragAccept }) =>
    isDragAccept &&
    css`
      border-color: ${Colors.Green[500]};

      ${DropZoneText} {
        color: ${Colors.Green[500]};
      }
    `}
  ${({ isDragReject }) =>
    isDragReject &&
    css`
      border-color: ${Colors.Red[400]};

      ${DropZoneText} {
        color: ${Colors.Red[400]};
      }
    `}
`

const AcceptedFileText = styled.span`
  font-size: 14px;
  line-height: 20px;
  transition: ${Transitions.all};
`

const ReceivedFile = styled.div<{ valid?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-left: 4px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  overflow: hidden;

  ${({ valid }) =>
    valid === true
      ? css`
          border-color: ${Colors.Green[500]};
          background-color: ${Colors.Green[100]};

          ${AcceptedFileText} {
            color: ${Colors.Green[500]};
          }
        `
      : css`
          border-color: ${Colors.Red[400]};
          background-color: ${Colors.Red[100]};

          ${AcceptedFileText} {
            color: ${Colors.Red[400]};
          }
        `};
`
