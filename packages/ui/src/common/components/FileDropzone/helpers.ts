import React from 'react'
import { DropEvent } from 'react-dropzone'

export const isDragEvent = (event: any): event is React.DragEvent<HTMLElement> => !!event?.dataTransfer
export const isChangeEvent = (event: any): event is React.ChangeEvent<HTMLInputElement> => !!event?.target?.files

export const getFilesFromRawEvent = (event: DropEvent): File[] => {
  let fileList: FileList | null = null

  if (isDragEvent(event)) {
    fileList = event.dataTransfer.files
  } else if (isChangeEvent(event)) {
    fileList = event.target.files
  }

  if (!fileList) {
    return []
  }

  return Array.from(fileList)
}
