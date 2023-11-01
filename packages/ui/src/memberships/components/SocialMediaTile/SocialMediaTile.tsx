import { MembershipMetadata } from '@joystream/metadata-protobuf'
import React from 'react'
import styled, { css } from 'styled-components'

import {
  CustomLinkIcon,
  EmailIcon,
  FacebookIcon,
  IRCIcon,
  MatrixIcon,
  TwitterIcon,
  DiscordIcon,
  WechatIcon,
  WhatsappIcon,
  YoutubeIcon,
  TelegramIcon,
  LinkedinIcon,
} from '@/common/components/icons/socials'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers'

export type Socials = keyof typeof MembershipMetadata.ExternalResource.ResourceType

export const socialToIcon: Record<Socials, React.ReactElement> = {
  EMAIL: <EmailIcon />,
  TWITTER: <TwitterIcon />,
  TELEGRAM: <TelegramIcon />,
  DISCORD: <DiscordIcon />,
  FACEBOOK: <FacebookIcon />,
  YOUTUBE: <YoutubeIcon />,
  MATRIX: <MatrixIcon />,
  IRC: <IRCIcon />,
  WECHAT: <WechatIcon />,
  WHATSAPP: <WhatsappIcon />,
  HYPERLINK: <CustomLinkIcon />,
  LINKEDIN: <LinkedinIcon />,
}

export const socialMediaList = Object.keys(socialToIcon) as (keyof typeof socialToIcon)[]

export interface SocialMediaTileProps {
  social: Socials
  onClick?: () => void
  active?: boolean
  id: string
}

export const SocialMediaTile = React.memo(({ social, onClick, active, id }: SocialMediaTileProps) => {
  return (
    <Wrapper id={id} onClick={onClick} active={active}>
      <RowGapBlock align="center" gap={2}>
        {socialToIcon[social]}
        <TextMedium value>{capitalizeFirstLetter(social.toLowerCase())}</TextMedium>
      </RowGapBlock>
    </Wrapper>
  )
})

const Wrapper = styled.div<{ active?: boolean }>`
  display: grid;
  cursor: pointer;
  user-select: none;
  place-items: center;
  height: 92px;
  width: 120px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.m};
  text-align: center;
  svg {
    path {
      fill: ${Colors.Black[300]};
    }
  }

  :hover {
    border: 1px solid ${Colors.Blue[400]};
  }

  ${({ active }) =>
    active &&
    css`
      border: 1px solid ${Colors.Blue[400]};
      svg {
        path {
          fill: ${Colors.Blue[400]};
        }
      }
    `}
`
