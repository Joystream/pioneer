import React from 'react'
import styled from 'styled-components'

import { CurrencyName } from '@/app/constants/currency'
import { CloseButton } from '@/common/components/buttons'
import { Arrow, QuestionIcon } from '@/common/components/icons'
import { Link } from '@/common/components/Link'
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
          <TextInlineMedium bold={true}>What is the {CurrencyName.integerValue} Token?</TextInlineMedium>
        </BannerTitle>
        <CloseButton onClick={() => setShouldDismissBanner(true)} />
      </BannerHeader>
      <TextMedium>
        The {CurrencyName.integerValue} token is the native crypto asset of the Joystream blockchain. It is used for
        platform governance, purchasing NFTs, trading creator tokens, and covering the&nbsp;blockchain processing fees.{' '}
        <StyledLink dark href="https://www.joystream.org/token/#exchanges">
          This token is listed on several exchanges.
        </StyledLink>
      </TextMedium>
      <TextLink href="https://www.joystream.org/token#earn" target="_blank">
        <TextInlineMedium bold={true}>Learn how to earn {CurrencyName.integerValue}s</TextInlineMedium>{' '}
        <Arrow size={'24'} direction="right" />
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
const StyledLink = styled(Link)`
  font-family: inherit;
`
