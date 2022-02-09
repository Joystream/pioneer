import React, { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { TextBig, TextExtraSmall, TextSmall } from '@/common/components/typography'
import { BorderRad, Colors, Shadows } from '@/common/constants'

export interface BannerProps {
  bannerTitle: string
  title: string
  icon: ReactNode
  description: string
  buttonText: string
  buttonIcon?: ReactNode
  path: string
}

export const Banner = ({ bannerTitle, title, icon, description, buttonText, buttonIcon, path }: BannerProps) => {
  const { push } = useHistory()
  return (
    <>
      <TextExtraSmall lighter>{bannerTitle}</TextExtraSmall>
      <BannerWrapper>
        <ContentWrapper>
          <TitleWrapper>
            {icon}
            <StyledTextBig bold>{title}</StyledTextBig>
          </TitleWrapper>
          <DescriptionWrapper>
            <TextSmall lighter>{description}</TextSmall>
          </DescriptionWrapper>
          <ButtonWrapper>
            <ButtonPrimary size="medium" onClick={() => push(path)}>
              {buttonText}
              {buttonIcon}
            </ButtonPrimary>
          </ButtonWrapper>
        </ContentWrapper>
      </BannerWrapper>
    </>
  )
}
const BannerWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  padding-top: 24px;
  border-radius: ${BorderRad.m};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.light};
`

const ContentWrapper = styled.div`
  width: 90%;
  padding-left: 17px;
`
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledTextBig = styled(TextBig)`
  margin-left: 13px;
`

const DescriptionWrapper = styled.div`
  padding-top: 6px;
`

const ButtonWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
`
