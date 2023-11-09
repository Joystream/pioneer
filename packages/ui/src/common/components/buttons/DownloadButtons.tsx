import { getType } from 'mime/lite'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import {
  BasicLinkButtonGhostStyles,
  LinkButtonInnerWrapper,
  LinkButtonSize,
} from '@/common/components/buttons/LinkButtons'

export interface DownloadLinkProps {
  name: string
  parts?: BlobPart[]
  content?: string
  type?: string
  className?: string
  disabled?: boolean
}

export const DownloadLink: FC<DownloadLinkProps> = ({ name, parts, content, type, className, children }) => {
  const [href, setHref] = useState('')

  useEffect(() => {
    const blobParts = content ? [content] : parts
    const url = URL.createObjectURL(new Blob(blobParts, { type: type ?? getType(name) ?? undefined }))
    setHref(url)
    return () => URL.revokeObjectURL(url)
  }, [content])

  return (
    <a className={className} href={href} download={name} target="__blank">
      {children}
    </a>
  )
}

interface DownloadButtonStyleProps extends DownloadLinkProps {
  $square?: boolean
  size: LinkButtonSize
}

export const DownloadButtonGhost: FC<DownloadButtonStyleProps> = ({ children, size, ...props }) => (
  <DownloadButtonGhostStyles size={size} {...props}>
    <LinkButtonInnerWrapper size={size}>{children}</LinkButtonInnerWrapper>
  </DownloadButtonGhostStyles>
)

const DownloadButtonGhostStyles = styled(DownloadLink)<DownloadButtonStyleProps>`
  ${BasicLinkButtonGhostStyles};
`
