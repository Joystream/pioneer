import React, { useCallback, useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import styled, { css } from 'styled-components'

import { getFilesFromRawEvent } from '@/common/components/FileDropzone/helpers'
import { Label } from '@/common/components/forms'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'

interface DragResponseProps {
  isDragActive?: boolean
  isDragAccept?: boolean
  isDragReject?: boolean
}

interface FileDropzoneProps extends Omit<DropzoneOptions, 'getFilesFromEvent'> {
  id?: string
  title: string
  subtitle: string
  isRequired?: boolean
  getFilesFromEvent: (file: File[]) => Promise<File[]>
}

const MEGABYTE = 1024 * 1024

export const FileDropzone = ({
  id,
  title,
  subtitle,
  getFilesFromEvent: _getFilesFromEvent,
  isRequired,
  ...dropzoneOptions
}: FileDropzoneProps) => {
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  const getFilesFromEvent = useCallback<Required<DropzoneOptions>['getFilesFromEvent']>(
    async (event) => {
      setIsProcessingFile(true)
      const res = await _getFilesFromEvent(getFilesFromRawEvent(event))
      setIsProcessingFile(false)
      return res
    },
    [_getFilesFromEvent]
  )
  const { isDragActive, isDragAccept, isDragReject, getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      ...dropzoneOptions,
      getFilesFromEvent,
    })

  return (
    <RowGapBlock gap={32}>
      <RowGapBlock gap={4}>
        <RowGapBlock gap={12}>
          <RowGapBlock gap={4}>
            <Label isRequired={isRequired}>{title}</Label>
            <TextMedium lighter>{subtitle}</TextMedium>
          </RowGapBlock>
          <DropZone
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
          >
            <input {...getInputProps({ id })} />
            <DropZoneText>
              Drop your file here or <DropZoneTextUnderline>browse</DropZoneTextUnderline>
            </DropZoneText>
          </DropZone>
        </RowGapBlock>
        {dropzoneOptions.maxSize && (
          <TextSmall lighter>Maximum upload file size is {dropzoneOptions.maxSize / MEGABYTE} MB</TextSmall>
        )}
      </RowGapBlock>
      {isProcessingFile ? (
        <LoaderBox>
          <Loading text="Processing your file..." withoutMargin />
        </LoaderBox>
      ) : (
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
                <b>{file.name}</b> ({file.size} B) was not loaded because of:{' '}
                {errors.map((error) => `"${error.message}"`).join(', ')}.
              </AcceptedFileText>
            </ReceivedFile>
          ))}
        </RowGapBlock>
      )}
    </RowGapBlock>
  )
}

export const DropZoneText = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-style: italic;
  color: ${Colors.Black[600]};
  transition: ${Transitions.all};
`

export const DropZoneTextUnderline = styled.span`
  font-weight: 700;
  text-decoration: underline;
`

export const DropZone = styled.div<DragResponseProps>`
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

const LoaderBox = styled(RowGapBlock)`
  > div {
    width: 100%;
    margin: 10px 0;
  }
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
