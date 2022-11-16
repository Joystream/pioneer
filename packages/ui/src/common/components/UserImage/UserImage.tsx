import React, { ImgHTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'

import { useIsImageBlacklisted } from '@/common/hooks/useIsImageBlacklisted'

import { ReportImageButton } from './ReportImageButton'

export interface UserImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackComponent?: ReactElement | null
  noReportButton?: boolean
}

export const UserImage = ({ src, fallbackComponent, noReportButton = false, ...props }: UserImageProps) => {
  const isBlacklisted = useIsImageBlacklisted(src)

  if (isBlacklisted) {
    return fallbackComponent ?? null
  }

  if (noReportButton) {
    return <Image src={src} {...props} />
  }

  return (
    <Wrapper>
      <Image src={src} {...props} />
      <ButtonWrapper>
        <ReportImageButton src={src} text="Report image" />
      </ButtonWrapper>
    </Wrapper>
  )
}

const ButtonWrapper = styled.span`
  position: absolute;
  right: 8px;
  top: 8px;
  display: none;
`

const Wrapper = styled.span`
  display: block;
  position: relative;
  width: fit-content;

  :hover ${ButtonWrapper} {
    display: block;
  }
`

const Image = styled.img`
  position: relative;
`
