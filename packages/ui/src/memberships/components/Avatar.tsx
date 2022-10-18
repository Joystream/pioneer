import React, { useState } from 'react'
import styled from 'styled-components'

import { LeadMemberIcon } from '@/common/components/icons'
import { Tooltip } from '@/common/components/Tooltip'
import { UserImage } from '@/common/components/UserImage/UserImage'

import { AvatarPlaceholder } from '../assets/images/AvatarPlaceholder'
import { Member } from '../types'

import { MemberPhoto, MemberPhotoContainer } from './components'
import { AvatarStarTooltipContainer, MemberInfo } from './MemberInfo'

interface AvatarProps {
  avatarUri?: string | null
  className?: string
}
interface MemberAvatarProps extends AvatarProps {
  small?: boolean
  noArea?: boolean
  isLead?: boolean
  fixedSize?: boolean
  big?: boolean
}

export interface MemberInfoAvatarProps extends MemberAvatarProps {
  member: Member
  isLead?: boolean
  forBig?: boolean
}

export const Avatar = React.memo(({ avatarUri, className }: AvatarProps) => {
  const [avatarStatus, setAvatarStatus] = useState<'loading' | 'error' | 'completed'>('loading')
  if (!avatarUri) {
    return <AvatarPlaceholderImage />
  }

  return (
    <>
      {avatarStatus !== 'error' && (
        <AvatarImg
          isLoading={avatarStatus === 'loading'}
          src={avatarUri}
          onError={() => setAvatarStatus('error')}
          onLoad={() => setAvatarStatus('completed')}
          className={className}
          noReportButton
        />
      )}
      {avatarStatus !== 'completed' && <AvatarPlaceholderImage />}
    </>
  )
})

export const MemberAvatar = React.memo(({ isLead, avatarUri, className, small, noArea, big }: MemberAvatarProps) => {
  return (
    <MemberPhoto small={small} noArea={noArea} big={big}>
      <MemberPhotoContainer>
        <Avatar avatarUri={avatarUri} className={className} />
        {isLead && (
          <Tooltip tooltipText="This member is a Lead">
            <AvatarStarTooltipContainer>
              <LeadMemberIcon />
            </AvatarStarTooltipContainer>
          </Tooltip>
        )}
      </MemberPhotoContainer>
    </MemberPhoto>
  )
})

export const MemberInfoAvatar = React.memo(
  ({ avatarUri, className, small, noArea, member, isLead, forBig, fixedSize }: MemberInfoAvatarProps) => {
    return (
      <Tooltip forBig={forBig} popupContent={<MemberInfo member={member} isOnDark isLead={isLead} />}>
        <MemberPhoto small={small} noArea={noArea}>
          <MemberPhotoContainer fixedSize={fixedSize}>
            <Avatar avatarUri={avatarUri} className={className} />
          </MemberPhotoContainer>
        </MemberPhoto>
      </Tooltip>
    )
  }
)

export const AvatarImg = styled(UserImage)<{ isLoading?: boolean }>`
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: cover;
  display: ${({ isLoading }) => isLoading && 'none'};
`

export const AvatarPlaceholderImage = styled(AvatarPlaceholder)`
  width: 100%;
  height: 100%;
`
