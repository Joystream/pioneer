import React from 'react'
import styled from 'styled-components'

import { LinkPrimary } from '@/common/components/buttons/Links'
import { ArrowRightIcon } from '@/common/components/icons'
import { BuildLogo } from '@/common/components/page/MobileView/images/BuildLogo'
import { Logo } from '@/common/components/page/Sidebar/Logo'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export const MobileView = () => {
  return (
    <MobileWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <BuildLogoWrapper>
        <BuildLogo />
      </BuildLogoWrapper>
      <InformationWrapper>
        <StyledTitle>Mobile version is underway</StyledTitle>
        <StyledSubtitle>
          Open this page in your desktop browser to access the Joystream DAO Governance App. Polkadot browser plugin is
          required to participate.
        </StyledSubtitle>
        <StyledButton href={'https://www.joystream.org/'} size="large">
          Homepage <ArrowRightIcon white />
        </StyledButton>
        <StyledButton href={'https://discord.com/invite/DE9UN3YpRP'} size="large">
          Discord <ArrowRightIcon white />
        </StyledButton>
      </InformationWrapper>
    </MobileWrapper>
  )
}

const MobileWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding-top: 60px;
  align-items: center;
  flex-direction: column;
  max-width: 100vw;
  min-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: ${Colors.Black[900]};
`

const LogoWrapper = styled.div`
  padding-top: 15px;
`

const BuildLogoWrapper = styled.div`
  padding-top: 20px;
`

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: 400;
`
const StyledTitle = styled(TextHuge)`
  color: ${Colors.White};
  font-family: 'Grotesk', Sans-serif;
  font-size: 32px;
  padding-top: 20px;
`

const StyledSubtitle = styled(TextMedium)`
  color: ${Colors.LightGrey};
  font-family: 'Inter', Sans-serif;
  font-size: 16px;
  padding-top: 20px;
  line-height: 24px;
`

const StyledButton = styled(LinkPrimary)`
  width: 60%;
  margin-top: 20px;
  align-self: center;
  border-radius: 0;
`
