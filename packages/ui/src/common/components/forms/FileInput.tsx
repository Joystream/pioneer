import React, {
  ChangeEventHandler,
  DragEventHandler,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useReducer,
} from 'react'
import styled from 'styled-components'

import { BasicLinkButtonPrimaryStyles } from '@/common/components/buttons/LinkButtons'
import { FileIcon } from '@/common/components/icons'
import { TextInlineSmall } from '@/common/components/typography'
import { Colors, Fonts } from '@/common/constants'
import { partition } from '@/common/utils'

export interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  title?: string
  onChange: (files: File[]) => void
}

export const FileInput = ({ title = 'Drag and drop files here', onChange, ...inputProps }: FileInputProps) => {
  const [files, addFiles] = useReducer(
    (files: File[], newFiles: File[]): File[] =>
      inputProps.multiple ? [...files, ...(newFiles ?? [])] : [newFiles[0]],
    []
  )
  useEffect(() => onChange(files), [files])

  const onUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      event.preventDefault()
      addFiles(Array.from(event.target.files ?? []))
    },
    [files]
  )

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault()
      const newFiles = Array.from(event.dataTransfer.items).flatMap(
        (dropped) => (dropped?.kind === 'file' && dropped.getAsFile()) || []
      )
      if (!newFiles.length) return

      const accept = inputProps.accept?.split(',').filter((type) => type)
      if (!accept?.length) return addFiles(newFiles)

      const [acceptExtensions, acceptMimeTypes] = partition(accept, (type) => type.startsWith('.'))
      const validFiles = newFiles.filter(({ type, name }) => {
        if (acceptMimeTypes.includes(type)) return true
        else {
          const fileExtension = name.replace(/[^.]/, '').toLowerCase()
          return fileExtension.length && acceptExtensions.some((extension) => fileExtension.endsWith(extension))
        }
      })
      if (validFiles?.length) return addFiles(validFiles)
    },
    [files, inputProps.multiple]
  )

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault()
  }, [])

  return (
    <>
      <FileInputContainer onDrop={onDrop} onDragOver={onDragOver}>
        <FileIcon />

        <h5>{title}</h5>

        <p>
          <LighterText>or</LighterText>{' '}
          <BrowseButton size="small">
            Browse for file <input type="file" onChange={onUpload} {...inputProps} />
          </BrowseButton>
        </p>
      </FileInputContainer>

      {files?.map((file, index) => (
        <FileEntry key={index}>
          <LighterText>{file.name}</LighterText>
        </FileEntry>
      ))}
    </>
  )
}

const BrowseButton = styled.label`
  ${BasicLinkButtonPrimaryStyles};
`
const FileInputContainer = styled.div`
  background: ${Colors.Black[25]};
  border: 2px dotted ${Colors.Black[300]};
  display: grid;
  gap: 10px;
  height: 204px;
  place-content: center;
  place-items: center;

  ${BrowseButton} {
    display: inline-flex;
  }

  input {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
`

const FileEntry = styled.div`
  align-items: center;
  background: ${Colors.Black[25]};
  display: flex;
  margin-top: 16px;
  height: 56px;

  &::before {
    background-color: ${Colors.Blue[200]};
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    content: '';
    display: block;
    margin-right: 16px;
    height: 100%;
    width: 4px;
  }
`

const LighterText = styled(TextInlineSmall).attrs({ lighter: true })`
  font-family: ${Fonts.Inter};
`
