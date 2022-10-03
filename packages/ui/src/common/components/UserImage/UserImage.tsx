import React, { ImgHTMLAttributes, useMemo } from 'react'
import styled from 'styled-components'

import { ModeratedItem } from '@/common/components/ModeratedItem'
import { useIsImageBlacklisted } from '@/common/hooks/useIsImageBlacklisted'

import { ReportImageButton } from './ReportImageButton'

export interface UserImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  customFallbackComponent?: React.ReactNode
}

export const UserImage = ({ src, customFallbackComponent, ...props }: UserImageProps) => {
  const isBlacklisted = useIsImageBlacklisted(src)

  const src = props.src
  const blacklistImage = useMemo(() => blacklistedImages.some((url) => url === src), [blacklistedImages.length])

  return (
    <>
      {blacklistImage ? (
        customFallbackComponent ? (
          customFallbackComponent
        ) : (
          <ModeratedItem title="This image was removed by a moderator" />
        )
      ) : (
        <Wrapper>
          <Image src={src} {...props} />
          <ButtonWrapper>
            <ReportImageButton src={src} text="Report image" />
          </ButtonWrapper>
        </Wrapper>
      )}
    </>
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
