import { Identicon } from '@polkadot/react-identicon'
import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { CopyComponent } from '@/common/components/CopyComponent'
import { DiscordIcon, TelegramIcon, TwitterIcon } from '@/common/components/icons/socials'
import { Tooltip } from '@/common/components/Tooltip'
import { BorderRad, Colors, Transitions } from '@/common/constants'
import { shortenAddress } from '@/common/model/formatters'
import { Address } from '@/common/types'
import { MemberIcons, MemberStatusTooltip } from '@/memberships/components'
import { Avatar } from '@/memberships/components/Avatar'

import { useAddressToMember } from '../hooks/useAddressToMember'

interface ValidatorInfoProps {
  address: Address
  isOnDark?: boolean
}

export const ValidatorInfo = React.memo(({ address, isOnDark }: ValidatorInfoProps) => {
  const { member } = useAddressToMember(address)

  const twitter = member?.externalResources?.find(({ source }) => {
    source === 'TWITTER'
  })
  const telegram = member?.externalResources?.find(({ source }) => {
    source === 'TELEGRAM'
  })
  const discord = member?.externalResources?.find(({ source }) => {
    source === 'DISCORD'
  })

  return (
    <ValidatorInfoWrap>
      <PhotoWrapper>
        <AccountPhoto>
          {member ? <Avatar avatarUri={member.avatar} /> : <Identicon size={40} theme={'beachball'} value={address} />}
        </AccountPhoto>
      </PhotoWrapper>
      <ValidatorHandle className="accountName">
        {member?.handle ?? 'Unknown'}
        {(twitter || telegram || discord) && (
          <MemberIcons>
            {twitter && (
              <Tooltip tooltipText={twitter.value}>
                <MemberStatusTooltip isOnDark={isOnDark} className={isOnDark ? 'tooltipondark' : 'tooltiponlight'}>
                  <TwitterIcon />
                </MemberStatusTooltip>
              </Tooltip>
            )}
            {telegram && (
              <Tooltip tooltipText={telegram.value}>
                <MemberStatusTooltip isOnDark={isOnDark} className={isOnDark ? 'tooltipondark' : 'tooltiponlight'}>
                  <TelegramIcon />
                </MemberStatusTooltip>
              </Tooltip>
            )}
            {discord && (
              <Tooltip tooltipText={discord.value}>
                <MemberStatusTooltip isOnDark={isOnDark} className={isOnDark ? 'tooltipondark' : 'tooltiponlight'}>
                  <DiscordIcon />
                </MemberStatusTooltip>
              </Tooltip>
            )}
          </MemberIcons>
        )}
      </ValidatorHandle>
      <AccountCopyAddress altText={shortenAddress(address)} copyText={address} />
    </ValidatorInfoWrap>
  )
})

const ValidatorInfoWrap = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: min-content 24px 18px;
  grid-column-gap: 12px;
  grid-template-areas:
    'accountphoto accounttype'
    'accountphoto accountname'
    'accountphoto accountaddress';
  align-items: center;
  width: 100%;
  justify-self: start;

  & ${BadgeStatus} {
    grid-area: accounttype;
  }
`

const AccountPhoto = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  align-self: center;
  height: 40px;
  width: 40px;
  background-color: ${Colors.Blue[500]};
  border-radius: ${BorderRad.full};
  overflow: hidden;
`

const PhotoWrapper = styled.div`
  grid-area: accountphoto;
  position: relative;
`

const ValidatorHandle = styled.h5`
  grid-area: accountname;
  max-width: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  transition: ${Transitions.all};
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
`

const AccountCopyAddress = styled(CopyComponent)`
  grid-area: accountaddress;
`
