import React from 'react'
import styled from 'styled-components'

import BrokenImg from '@/app/assets/images/BrokenImg.png'
import DefaultImg from '@/app/assets/images/DefaultImg.png'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface DescriptionProps {
  imageUrl?: string | null
  className?: string
  title?: string
  description?: string
}

export const Description = React.memo(({ imageUrl, className, title, description }: DescriptionProps) => {
  return (
    <DescriptionContainer>
      <ImageContainer>
        <DescriptionImage
          src={imageUrl || DefaultImg}
          className={className}
          onError={(e) => (
            ((e.target as HTMLImageElement).src = BrokenImg), ((e.target as HTMLImageElement).onerror = () => undefined)
          )}
        />
      </ImageContainer>
      <TextHuge bold>{title}</TextHuge>
      <DescriptionText>{description}</DescriptionText>
    </DescriptionContainer>
  )
})

const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`

const ImageContainer = styled.div`
  max-width: 100%;
`

const DescriptionImage = styled.img`
  max-width: 100%;
  object-fit: contain;
`

const DescriptionText = styled(TextMedium)`
  top: 60px;
  color: ${Colors.Black[500]};
`
