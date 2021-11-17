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
  parts: BlobPart[]
  type?: string
  className?: string
  disabled?: boolean
}

export const DownloadLink: FC<DownloadLinkProps> = ({ name, parts, type, className, children }) => {
  const [href, setHref] = useState('')

  useEffect(() => {
    const url = URL.createObjectURL(new Blob(parts, { type: type ?? getType(name) ?? undefined }))
    setHref(url)
    return () => URL.revokeObjectURL(url)
  }, [])

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
