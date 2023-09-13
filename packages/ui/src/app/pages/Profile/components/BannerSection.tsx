import React from 'react'
import styled from 'styled-components'

import { CloseButton } from '@/common/components/buttons'
import { LinkButtonLinkStyles } from '@/common/components/buttons/LinkButtons'
import { Arrow, QuestionIcon } from '@/common/components/icons'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { DefaultTooltip } from '@/common/components/Tooltip'
import { TextInlineMedium, TextMedium } from '@/common/components/typography/Text'
import { Colors } from '@/common/constants'

interface Props {
  setShouldDismissBanner: (bool: boolean) => void
}

export const BannerSection = ({ setShouldDismissBanner }: Props) => {
  return (
    <Banner gap={8}>
      <BannerHeader>
        <BannerTitle>
          <BannerTooltip>
            <QuestionIcon />
          </BannerTooltip>
          <TextInlineMedium bold={true}>What is Joy Token?</TextInlineMedium>
        </BannerTitle>
        <CloseButton onClick={() => setShouldDismissBanner(true)} />
      </BannerHeader>
      <TextMedium>
        JOY token is a native crypto asset of Joystream blockchain. It is used for platform governance, purchasing NFTs,
        trading creator tokens, and covering blockchain processing fees. They are listed on&nbsp;
        <CustomLinkStyle
          as={'a'}
          to={''}
          href="https://www.mexc.com/exchange/JOYSTREAM_USDT?_from=market"
          target="_blank"
          size={'medium'}
        >
          <TextInlineMedium>MEXC</TextInlineMedium>
        </CustomLinkStyle>
        &nbsp;exchange under "JOYSTREAM" ticker.
      </TextMedium>
      <TextLink href="https://www.joystream.org/token#earn" target="_blank">
        <TextInlineMedium bold={true}>Learn how to earn JOY's</TextInlineMedium> <Arrow size={'24'} direction="right" />
      </TextLink>
    </Banner>
  )
}
const Banner = styled(RowGapBlock)`
  padding: 16px;
  background-color: ${Colors.Blue[50]};
`
const BannerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const BannerTitle = styled.h6`
  display: flex;
  column-gap: 8px;
`

const TextLink = styled.a`
  color: ${Colors.Blue[500]};
  display: flex;
  column-gap: 8px;
  width: 213px;

  ${TextInlineMedium} {
    margin: auto 0px;
  }
`
const BannerTooltip = styled(DefaultTooltip)`
  margin-top: 1px;
`
const CustomLinkStyle = styled(LinkButtonLinkStyles)`
  display: inline-flex;
  // margin-left: 2px;
  // margin-right: 2px;
`
