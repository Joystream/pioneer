import React from 'react'
import styled from 'styled-components'

import { ImagePlaceholder } from '@/common/components/ImagePlaceholder'
import { UserImage } from '@/common/components/UserImage/UserImage'
import { Colors, Transitions } from '@/common/constants'

interface CandidateCardImageProps {
  imageUrl?: string | null
  className?: string
}

export const CandidateCardImage = React.memo(({ imageUrl, className }: CandidateCardImageProps) => {
  return (
    <CandidateCardImageContainer>
      {imageUrl ? (
        <CardImage
          src={imageUrl}
          className={className}
          fallbackComponent={<ImagePlaceholder className={className} />}
        />
      ) : (
        <ImagePlaceholder className={className} />
      )}
    </CandidateCardImageContainer>
  )
})

const CardImage = styled(UserImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const CandidateCardImageContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + 32px);
  height: calc(100% + 32px);
  transform: translate(-50%, -50%) scale(0.9);
  transform-origin: 50% 50%;
  background-color: ${Colors.Blue[50]};
  transition: ${Transitions.all};
  overflow: hidden;
`
