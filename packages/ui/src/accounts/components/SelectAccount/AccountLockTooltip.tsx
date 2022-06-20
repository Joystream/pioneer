import React, { useMemo } from 'react'
import styled from 'styled-components'

import { ProfileRoutes } from '@/app/constants/routes'
import { Tooltip, TooltipExternalLink, TooltipLink } from '@/common/components/Tooltip'
import { TextInlineMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

import { OptionLock } from '../../types'

interface Props {
  locks?: OptionLock[]
  children: React.ReactNode
}

export const AccountLockTooltip = ({ locks, children }: Props) => {
  const { showModal } = useModal()
  const tooltipTexts = useMemo(() => {
    const texts: React.ReactElement[] = []

    if (locks?.includes('boundMembership')) {
      texts.push(
        <li>
          This account is bounded to another membership.{' '}
          <LinkText onClick={() => showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })}>
            Change membership
          </LinkText>{' '}
          to use this account.
          <br />
        </li>
      )
    }

    if (locks?.includes('rivalrousLock')) {
      texts.push(
        <li>
          You cannot select this account because it contains rivalrous lock.{' '}
          <InlineExternalLink
            href="https://joystream.gitbook.io/testnet-workspace/system/accounts-and-staking#locks-1"
            target="_blank"
          >
            <LinkText>Learn more about Locks.</LinkText>
          </InlineExternalLink>
          <br />
        </li>
      )
    }

    if (locks?.includes('recoverableLock')) {
      texts.push(
        <li>
          You cannot select this account because it contains lock.{' '}
          <TooltipLink to={ProfileRoutes.profile} target="_self">
            Recover this lock
          </TooltipLink>{' '}
          to use this account.
          <br />
        </li>
      )
    }

    if (locks?.includes('insufficientFunds')) {
      texts.push(
        <li>
          This account does not have enough tokens. You can{' '}
          <LinkText onClick={() => showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })}>move funds</LinkText>{' '}
          from other accounts to meet the requirements.
          <br />
        </li>
      )
    }

    return <LocksList>{texts}</LocksList>
  }, [JSON.stringify(locks)])

  return <Tooltip tooltipText={tooltipTexts}>{children}</Tooltip>
}

const LinkText = styled(TextInlineMedium)`
  color: ${Colors.Blue[500]};
  text-decoration: underline;
  cursor: pointer;
`

const InlineExternalLink = styled(TooltipExternalLink)`
  display: inline;
`

const LocksList = styled.ul`
  & li {
    padding: 10px 0;
    border-bottom: 1px solid ${Colors.Black[600]};
    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
`
