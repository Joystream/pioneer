import React, { useState, ChangeEventHandler, DragEventHandler, InputHTMLAttributes, useCallback } from 'react'
import styled from 'styled-components'
import { ValidationError } from 'yup'

import { BasicLinkButtonPrimaryStyles } from '@/common/components/buttons/LinkButtons'
import { TextInlineSmall } from '@/common/components/typography'
import { BorderRad, Colors, Fonts, Transitions } from '@/common/constants'
import { partition } from '@/common/utils'

import { DropFileIcon } from '../icons/DropFileIcon'

import { ControlProps, InputArea, InputComponent, InputContainer } from '.'

export interface FileEntry {
  file: File
  errors?: ValidationError[]
}

type NativeFileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>
export interface FileInputProps extends ControlProps<FileEntry[], File[]>, NativeFileInputProps {
  title?: string
}

export const FileInput = ({ title = 'Drag and drop files here', value, onChange, ...inputProps }: FileInputProps) => {
  const [fileInZone, setFileInZone] = useState(false)
  const onUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      event.preventDefault()
      onChange(Array.from(event.target.files ?? []))
    },
    [onChange]
  )

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault()

      const addFiles = (files: File[]) => onChange(files.slice(0, inputProps.multiple ? undefined : 1))
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
    [onChange, inputProps.accept, inputProps.multiple]
  )

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault()
    setFileInZone(true)
  }, [])

  const onDragLeave: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault()
    setFileInZone(false)
  }, [])

  return (
    <>
      <FileInputContainer onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave} fileInZone={fileInZone}>
        <FileInputIcon />

        <FileInputTitle>{title}</FileInputTitle>

        <p>
          <LighterText>or</LighterText>{' '}
          <BrowseButton size="small">
            Browse for file <input type="file" onChange={onUpload} {...inputProps} />
          </BrowseButton>
        </p>
      </FileInputContainer>

      {value?.map(({ file, errors }, index) => (
        <FilePreview
          key={index}
          validation={errors && (errors.length ? 'invalid' : 'valid')}
          message={errors?.[0]?.message}
        >
          <LighterText>{file.name}</LighterText>
        </FilePreview>
      ))}
    </>
  )
}

const BrowseButton = styled.label`
  ${BasicLinkButtonPrimaryStyles};

  margin-left: 10px;
  text-transform: none;
`

const FileInputContainer = styled.div<{ fileInZone?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 204px;
  border: 2px dashed ${({ fileInZone }) => (fileInZone ? Colors.Blue[500] : Colors.Black[300])};
  border-radius: ${BorderRad.m};
  background-color: ${Colors.Black[25]};
  box-shadow: ${({ fileInZone }) =>
    fileInZone ? `inset 0px 0px 104px ${Colors.Blue[500] + '29'}` : 'inset 0px 0px 0px transparent'};
  transition: ${Transitions.all};

  ${BrowseButton} {
    display: inline-flex;
  }

  input {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[500]};
    ${BrowseButton} {
      &:before {
        transform: translate(-50%, -50%);
      }
    }
  }
`

const FileInputIcon = styled(DropFileIcon)`
  margin: 8px 0;
  color: ${Colors.Black[400]};
`

const FileInputTitle = styled.h5`
  margin: 10px auto;
`

const FilePreview = styled(InputComponent)`
  margin-top: 16px;

  ${InputContainer} {
    background: ${Colors.Black[25]};
    border: none;
    height: 56px;
  }

  ${InputArea}::before {
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
